import requests
precision = 0.5

def azureDetect(endpoint, key, image_path):
    
    i = 0
    analyze_url = endpoint + "vision/v3.1/analyze"
    

    # Read the image into a byte array
    image_data = open(image_path, "rb").read()
    headers = {
    'Ocp-Apim-Subscription-Key': key,
    'Content-Type': 'application/octet-stream'
    }
    params = {
    'visualFeatures': 'Objects'
    }
    response = requests.post(
    analyze_url, headers = headers, params = params, data = image_data)
    response.raise_for_status()

    analysis = response.json()

    for objects in analysis['objects']:
        if (objects["confidence"] > precision):
            i += 1
    
    return i