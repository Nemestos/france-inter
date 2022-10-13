# import modules
from email.mime import image
from assets import hashfile, mongoDbConnect, loadEnvVar, checkIfExist, initDb
from azureDetect import azureDetect
from azureTrad import azureTrad
from azureGen import azureGen
import time

def scan(maxpeople, file, text, language, init, verbose):
    fileName = file.split('/')[-1]
    #languageTab = language.split(',')
    detected = 0
    imageDataId = ""
    audioDataId = ""

    try:
        envVar = loadEnvVar()
    except:
        return 1, "Can't load environment variable. Maybe file does not exist"

    try:
        fileHashed = hashfile(file)
    except:
        return 1, "can't hash files maybe not exist"

    try:
        outputcol, imagecol, audiocol = mongoDbConnect(envVar)

        if (init == True):
            return 0, initDb(outputcol, imagecol, audiocol)
    except:
        return 1, "can't use mongodb"

    try:
        checkResultImg = checkIfExist(imagecol, 'hash', fileHashed)
    except:
        return 1, "can't use checkIfExist function img"

    if (verbose):
        print(checkResultImg)
        print(envVar[4], envVar[3])

    if (checkResultImg[0] == False):
        try:
            detected = azureDetect(envVar[4], envVar[3], file)
        except:
            return 1, "can't detect person"

        imageDataIn = {"hash": fileHashed, "path": file, "detected": detected}
        if (verbose):
            print(imageDataIn)
        imageDataId = imagecol.insert_one(imageDataIn).inserted_id
    else:
        detected = checkResultImg[1]["detected"]
        imageDataId = checkResultImg[1]["_id"]

    if (detected <= maxpeople):
        output = {"image_name": fileName,
                  "id_image": imageDataId, "id_trads": None}
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
        
    else:
        audioDataId = checkResultAudio[1]["_id"]
    
    if f"Trad_{language}" in checkResultAudio[1]:
        if (verbose):
            print(f"Trad_{language}" + " is ok")
        output = {"image_name": fileName, "id_image": imageDataId, "id_trads": audioDataId}
        return 0, outputcol.insert_one(output).inserted_id
    else:
        
        try:
            tradTxt = azureTrad(envVar[5], envVar[6], language, text)
        except:
            return 1, "can't use trad function'"
        
        pathToAudio = f"{str(time.time()).replace( '.','-')}_audio_{language}.wav"
        
        azureGen(envVar[7], envVar[8], pathToAudio, "en-US", "en-US-JennyNeural", tradTxt)
        
        updatevalues = { "$set": { f"Trad_{language}": [tradTxt, pathToAudio] } }
        
        try:
            audiocol.update_one({ "_id": audioDataId }, updatevalues)
        except:
            return 1, "can't update audio col"
        
        return 0, str(audioDataId)
        
    
    
    #azureTrad()

    return 1, "Not Finish normaly"

