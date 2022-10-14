import requests
precision = 0.5

def azureDetect(endpoint, key, dataIn):
    
    i = 0
    analyze_url = endpoint + "vision/v3.1/analyze"
    

    # Read the image into a byte array

    headers = {
    'Ocp-Apim-Subscription-Key': key,
    'Content-Type': 'application/octet-stream'
    }
    params = {
    'visualFeatures': 'Objects'
    }
    response = requests.post(
    analyze_url, headers = headers, params = params, data = dataIn)

    response.raise_for_status()

    analysis = response.json()

    for objects in analysis['objects']:
        if (objects["confidence"] > precision):
            i += 1
    
    return i