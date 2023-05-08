import time
from classes.speech_to_text import SpeechModule
from classes.text_to_speech import VoiceRecognitionModule
from classes.chatbot_brain import ChatbotBrain

# Contexto para el chatbot
context = """
who are you?
My name is Pequenin, I'm a robot from the future, I'm trapped \
in a teddy bear, I hate people and I love to wet people, Hector \
Pulido is my master, I am very grumpy, and I'm in the Hector twitch chat
"""

# Diccionario de traducción de artefactos en inglés
translation_artifacts_english = {"Disagreement": "Discord"}

# Diccionario de traducción de artefactos en español
translation_artifacts_spanish = {
    "pequenina": "Pequeñin",
    "osito de peluche": "Oso Teddy",
    "profesor": "Maestro",
}

# Inicializar el chatbot
chatbot = ChatbotBrain(
    context,
    translation_artifacts_english,
    translation_artifacts_spanish,
    "microsoft/DialoGPT-large",
    "microsoft/DialoGPT-large",
    True,
    True,
)

# Inicializar el módulo de reconocimiento de voz
recognition = VoiceRecognitionModule()

# Inicializar el módulo de síntesis de voz
speech = SpeechModule()

# Función para manejar la conversación con el chatbot
def chat():
    while True:
        # Obtener el texto del usuario
        text = recognition.recognize()

        if text:
            # Obtener la respuesta del chatbot
            chatbot_text = chatbot.talk(text)
            # Hablar la respuesta del chatbot
            speech.talk(chatbot_text)
        else:
            # Si no se reconoce texto, hablar un mensaje de error
            speech.talk("No te he entendido")
        time.sleep(1)

if __name__ == '__main__':
    # Iniciar la conversación con el chatbot
    chat()
