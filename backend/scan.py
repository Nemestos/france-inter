# import modules
from email.mime import image
from assets import hashfile, mongoDbConnect, loadEnvVar, checkIfExist, initDb

def scan(maxpeople, file, text, language, init):
    fileName = file.split('/')[-1]
    languagesArray = language.split(',')
    detected = 0
    imageDataId = ""
    
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
        checkResult = checkIfExist(imagecol, 'hash', fileHashed)
    except:
        return 1, "can't use checkIfExist function"

    # print(checkResult)
    
    if (checkResult[0] == False):
        
        # Scan number of people

        imageDataIn = {"hash": fileHashed, "path": file, "detected": detected}
        imageDataId = imagecol.insert_one(imageDataIn).inserted_id
    else:
        detected = checkResult[1]["detected"]
        imageDataId = checkResult[1]["_id"]
        
    if (detected <= maxpeople ):
        output = { "image_name": fileName, "id_image": imageDataId, "id_trads": None }
        return 0, outputcol.insert_one(output).inserted_id
    
    return 0, "Operation execute successfully"

