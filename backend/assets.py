from re import X
import pymongo
import hashlib
import os
from dotenv import load_dotenv


def loadEnvVar():
    with open("/usr/src/.env") as file:
        envVar = file.read()
    envVar = envVar.split('\n')

    for var in envVar:
        key = var.split('=')

        if (key[0] == "MONGODB_HOST"):
            MONGODB_HOST = key[1]

        elif (key[0] == "MONGODB_PORT"):
            MONGODB_PORT = key[1]

        elif (key[0] == "MONGODB_DB"):
            MONGODB_DB = key[1]

        elif (key[0] == "AZURE_KEY_IMAGE"):
            AZURE_KEY_IMAGE = key[1]

        elif (key[0] == "AZURE_ENDPOINT_IMAGE"):
            AZURE_ENDPOINT_IMAGE = key[1]

        elif (key[0] == "AZURE_KEY_TRAD"):
            AZURE_KEY_TRAD = key[1]

        elif (key[0] == "AZURE_ENDPOINT_TRAD"):
            AZURE_ENDPOINT_TRAD = key[1]

        elif (key[0] == "AZURE_KEY_AUDIO"):
            AZURE_KEY_AUDIO = key[1]

        elif (key[0] == "AZURE_LOCATION_AUDIO"):
            AZURE_LOCATION_AUDIO = key[1]

        elif (key[0] == "MINIO_ACCESS"):
            MINIO_ACCESS = key[1]

        elif (key[0] == "MINIO_SECRET"):
            MINIO_SECRET = key[1]
    #            0             1           2            3                 4                     5               6                     7                  8                  9             10
    return MONGODB_HOST, MONGODB_PORT, MONGODB_DB, AZURE_KEY_IMAGE, AZURE_ENDPOINT_IMAGE, AZURE_KEY_TRAD, AZURE_ENDPOINT_TRAD, AZURE_KEY_AUDIO, AZURE_LOCATION_AUDIO, MINIO_ACCESS, MINIO_SECRET


def mongoDbConnect(envVar):
    try:
        client = pymongo.MongoClient(
            f"mongodb://db:{envVar[1]}/", serverSelectionTimeoutMS=20)
        client.server_info()
    except:
        print("err can't connect")

    francInterdb = client["france_inter"]

    outputcol = francInterdb["outputs"]
    imagecol = francInterdb["images"]
    audiocol = francInterdb["audios"]

    return outputcol, imagecol, audiocol


def hashfile(data):
    # h = hashlib.sha256()
    # b = bytearray(128*1024)
    # mv = memoryview(b)

    # while n := dat  :
    #     h.update(mv[:n])
    # return h.hexdigest()
    hashed = hashlib.md5(data).hexdigest()

    return hashed


def checkIfExist(col, key, value):
    mydoc = col.find_one({key: value})

    if (mydoc != None):
        return True, mydoc
    else:
        return False, mydoc


def initDb(outputcol, imagecol, audiocol):
    output = {"image_name": "deux.jpg",
              "id_image": "efefe", "id_trads": "zefzf"}
    image = {"hash": "feazoefaef", "path": "path/to/file", "detect": 0}
    audio = {"Trad_fr": ["bonjour", "path/to/file"], "input_txt": "bonjour"}

    x = outputcol.insert_one(output)
    y = imagecol.insert_one(image)
    z = audiocol.insert_one(audio)

    # x = outputcol.delete_many({})
    # y = imagecol.delete_many({})
    # z = audiocol.delete_many({})

    return "DB reset and init"
