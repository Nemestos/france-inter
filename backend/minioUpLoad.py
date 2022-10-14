from socketserver import DatagramRequestHandler
from minio import Minio
from minio.error import S3Error


def uploadMinio(accessKey, secretKey, fileName, filePath):
    # Create a client with the MinIO server playground, its access key
    # and secret key.

    try:
        client = Minio(
            "localhost:9000",
            access_key=accessKey,
            secret_key=secretKey,
            secure=False,
        )
    except:
        print("Can't connect to Minio")
        return

    # Make 'asiatrip' bucket if not exist.
    found = client.bucket_exists("api-files")
    if not found:
        return 1

    client.fput_object(
        "api-files", fileName, filePath,
    )

    return 0


def downloadMinio(accessKey, secretKey, fileName):
    # Create a client with the MinIO server playground, its access key
    # and secret key.

    try:
        client = Minio(
            "localhost:9000",
            access_key=accessKey,
            secret_key=secretKey,
            secure=False,
        )
    except:
        print("Can't connect to Minio")
        return

    # Make 'asiatrip' bucket if not exist.
    found = client.bucket_exists("api-files")
    if not found:
        return 1

    try:
        data = client.get_object('api-files', fileName).data

        return data
    
    except:
        print("errofut")

    return 0
# 1665753385-4657779_quatre.jpg
