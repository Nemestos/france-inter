from re import X
import pymongo
import hashlib
import os
from dotenv import load_dotenv

def loadEnvVar():
    with open("../.env") as file:
        envVar = file.read()
    envVar = envVar.split('\n')
    
    for var in envVar:
        key = var.split('=')
        
        if (key[0] == "MONGODB_HOST"):
            MONGODB_HOST=key[1]
            
        elif (key[0] == "MONGODB_PORT"):
            MONGODB_PORT=key[1]
            
        elif (key[0] == "MONGODB_DB"):
            MONGODB_DB=key[1]
            
        elif (key[0] == "AZURE_KEY"):
            AZURE_KEY=key[1]
         
        elif (key[0] == "AZURE_ENDPOINT_IMAGE"):   
            AZURE_ENDPOINT_IMAGE=key[1]
           
    return MONGODB_HOST, MONGODB_PORT, MONGODB_DB, AZURE_KEY, AZURE_ENDPOINT_IMAGE

def mongoDbConnect(envVar):    
    try:
        client = pymongo.MongoClient(f"{envVar[0]}://localhost:{envVar[1]}/", serverSelectionTimeoutMS=20)
        client.server_info()
    except pymongo.errors.ServerSelectionTimeoutError as err:
        print(err)    
    
    francInterdb = client["francInter"]
    
    outputcol = francInterdb["outputcol"]
    imagecol = francInterdb["imagecol"] 
    audiocol = francInterdb["audiocol"]
    
    return outputcol, imagecol, audiocol

def hashfile(filename):
    h  = hashlib.sha256()
    b  = bytearray(128*1024)
    mv = memoryview(b)
    
    with open(filename, 'rb', buffering=0) as f:
        while n := f.readinto(mv):
            h.update(mv[:n])
    return h.hexdigest()

def checkIfExist(col, key, value):
    mydoc = col.find_one({key: value})
    
    if (mydoc != None):
        return True, mydoc
    else:
        return False, mydoc

def initDb(outputcol, imagecol, audiocol):
    output = { "image_name": "deux.jpg", "id_image": "efefe", "id_trads": "zefzf" }
    image = { "hash": "feazoefaef", "path": "path/to/file", "detect": 0 }
    audio = { "Trad_fr": ["bonjour", "path/to/file"], "input_txt": "bonjour" }

    x = outputcol.insert_one(output)
    y = imagecol.insert_one(image)
    z = audiocol.insert_one(audio)
    
    # x = outputcol.delete_many({})
    # y = imagecol.delete_many({})
    # z = audiocol.delete_many({})
    
    return "DB reset and init" 
    
    