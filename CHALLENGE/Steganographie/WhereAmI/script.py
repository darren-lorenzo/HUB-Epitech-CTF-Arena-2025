from pydub import AudioSegment
import wave
import struct

# Fonction pour convertir un texte en binaire
def text_to_bin(text):
    return ''.join(format(ord(c), '08b') for c in text)

# Fonction pour cacher le message dans un fichier audio
def hide_message_in_audio(audio_file, message):
    # Charger le fichier audio
    audio = AudioSegment.from_wav(audio_file)
    audio_samples = list(audio.get_array_of_samples())

    # Convertir le message en binaire
    binary_message = text_to_bin(message) + '1111111111111110'  # Ajouter un 'delimiteur' de fin

    # Insérer les bits du message dans les LSB des échantillons audio
    message_index = 0
    for i in range(len(audio_samples)):
        if message_index < len(binary_message):
            sample = audio_samples[i]
            # Modifier le LSB pour cacher le bit du message
            audio_samples[i] = (sample & ~1) | int(binary_message[message_index])
            message_index += 1
        if message_index >= len(binary_message):
            break

    # Sauvegarder le fichier audio modifié
    audio_with_message = audio._spawn(bytes(struct.pack('h', sample) for sample in audio_samples))
    audio_with_message.export("audio_with_hidden_message.wav", format="wav")
    print("Message caché dans l'audio avec succès!")

# Exemple d'utilisation
hide_message_in_audio("audio.wav", "Ceci est un message secret.")
