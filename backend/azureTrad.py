import requests
import uuid
import json


def azureTrad(key, endpoint, languageTab, txt):

    # Add your location, also known as region. The default is global.
    # This is required if using a Cognitive Services resource.
    location = "francecentral"

    path = '/translate'
    constructed_url = endpoint + path

    params = {
        'api-version': '3.0',
        'to': [languageTab]
    }

    headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Region': location,
        'X-ClientTraceId': str(uuid.uuid4())
    }

    # You can pass more than one object in body.
    body = [
        {"Text": txt}
    ]

    request = requests.post(
        constructed_url, params=params, headers=headers, json=body)
    response = request.json()
    
    return response[0]["translations"][0]["text"]
