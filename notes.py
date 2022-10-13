import requests

analyze_url = 'https://franceinterscan.cognitiveservices.azure.com/' + "vision/v3.1/analyze"

image_path = "testImages/neuf.jpg"

# Read the image into a byte array
image_data = open(image_path, "rb").read()
headers = {
   'Ocp-Apim-Subscription-Key': '5d880ebf38984197a1130a00d393b2f9',
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
    print(objects["object"] )

    
