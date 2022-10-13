import azure.cognitiveservices.speech as speechsdk

def azureGen(speech_key, service_region, path, language, voice, text):

    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
    audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

    speech_config.speech_synthesis_language = language # "en-US" 
    speech_config.speech_synthesis_voice_name = voice # "en-US-JennyNeural"

    audio_config = speechsdk.audio.AudioOutputConfig(filename=path)

    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    synthesizer.speak_text_async(text).get()


















