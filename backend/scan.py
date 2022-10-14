# import modules
from email.mime import image
from assets import hashfile, mongoDbConnect, loadEnvVar, checkIfExist, initDb
from azureDetect import azureDetect
from azureTrad import azureTrad
from azureGen import azureGen
from minioUpLoad import uploadMinio, downloadMinio
import time

def scan(maxpeople, file, text, language, init, verbose):
    languageTab = language.split(',')
    detected = 0
    imageDataId = ""
    audioDataId = ""
    try:
        envVar = loadEnvVar()
    except:
        return 1, "Can't load environment variable. Maybe file does not exist"

    try: 
        fileData = downloadMinio(envVar[9], envVar[10], file)
    except:
        return 1, "Can't download minioFile"
    
    
    try:
        fileHashed = hashfile(fileData)
    except:
        return 1, "can't hash files maybe not exist"

    try:
        outputcol, imagecol, audiocol = mongoDbConnect(envVar)

        if (init == True):
            return 0, initDb(outputcol, imagecol, audiocol)
    except:
        return 1, "can't use mongodb here"

    try:
        checkResultImg = checkIfExist(imagecol, 'hash', fileHashed)
    except:
        return 1, "can't use checkIfExist function img"

    if (verbose):
        print(checkResultImg)
        print(fileHashed)

    if (checkResultImg[0] == False):
        
        try:
            detected = azureDetect(envVar[4], envVar[3], fileData)
        except:
            return 1, "can't detect person"
        
        
        imageDataIn = {"hash": fileHashed, "path": file, "detected": detected}
        if (verbose):
            print(imageDataIn)
        imageDataId = imagecol.insert_one(imageDataIn).inserted_id
    else:
        detected = checkResultImg[1]["detected"]
        imageDataId = checkResultImg[1]["_id"]

    if (verbose):
        print("After CheckResult -------+")

    if (detected <= maxpeople):
        output = {"image_name": file, "max_pers": maxpeople, "id_image": imageDataId, "id_trads": None}
        return 0, outputcol.insert_one(output).inserted_id

    try:
        checkResultAudio = checkIfExist(audiocol, "input_txt", text)
    except:
        return 1, "can't use checkIfExist function audio"
    
    
    if (checkResultAudio[0] == False):
        audio = {"input_txt": text}
        audioDataId = audiocol.insert_one(audio).inserted_id
        
        try:
            checkResultAudio = checkIfExist(audiocol, "input_txt", text)
        except:
            return 1, "can't use checkIfExist function audio"
        
        
        try:
            tradTxt = azureTrad(envVar[5], envVar[6], languageTab[1], text)
        except:
            return 1, "can't use trad function'"
        
        
        pathToAudioEn = f"{str(time.time()).replace( '.','-')}_audio_{languageTab[1]}.wav"
        pathToAudioFr = f"{str(time.time()).replace( '.','-')}_audio_{languageTab[0]}.wav"
        
        azureGen(envVar[7], envVar[8], pathToAudioEn, "en-US", "en-US-JennyNeural", tradTxt)
        azureGen(envVar[7], envVar[8], pathToAudioFr, "fr-FR", "fr-FR-JosephineNeural", text)
        
        if (uploadMinio(envVar[9], envVar[10], pathToAudioEn, pathToAudioEn) == 1):
            return 1, "Save minio fail"
        
        if (uploadMinio(envVar[9], envVar[10], pathToAudioFr, pathToAudioFr) == 1):
            return 1, "Save minio fail"
        
        updatevalues = { "$set": { f"Trad_{languageTab[1]}": [tradTxt, pathToAudioEn], f"Trad_{languageTab[0]}": [text, pathToAudioFr] } }
        
        try: 
            audiocol.update_one({ "_id": audioDataId }, updatevalues)
        except:
            return 1, "can't update audio col"
    
        output = {"image_name": file, "max_pers": maxpeople, "id_image": imageDataId, "id_trads": audioDataId}
        return 0, outputcol.insert_one(output).inserted_id
        
    else:
        
        audioDataId = checkResultAudio[1]["_id"]
        output = {"image_name": file, "max_pers": maxpeople, "id_image": imageDataId, "id_trads": audioDataId}
        return 0, outputcol.insert_one(output).inserted_id

        


    return 1, "Not Finish normaly"

