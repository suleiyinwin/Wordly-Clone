from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


def is_valid_word(word):
    """Check if the word exists in an online dictionary."""
    response = requests.get(DICTIONARY_API_URL + word)
    return response.status_code == 200 

def get_random_secret_word():
    """Fetch a random 5-letter word from Datamuse API."""
    while True:
        response = requests.get("https://random-word-api.vercel.app/api?words=1&length=5")
        if response.status_code == 200:
            word = response.json()[0]
            if is_valid_word(word): 
                return word  


SECRET_WORD = get_random_secret_word()
print(f"Secret Word: {SECRET_WORD}")  

@app.route("/guess", methods=["POST"])
def check_guess():
    try:
        data = request.json
        guess = data.get("word", "").lower()

        if len(guess) != 5:
            return jsonify({"error": "Word must be 5 letters"}), 400

        if not is_valid_word(guess):
            return jsonify({"error": "Not a valid word!"}), 400

        result = []
        win = True

        for i, letter in enumerate(guess):
            if letter == SECRET_WORD[i]:
                result.append("correct")
            elif letter in SECRET_WORD:
                result.append("present")
                win = False
            else:
                result.append("absent")
                win = False

        return jsonify({"result": result, "win": win})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Server Error"}), 500
    
@app.route("/new-word", methods=["GET"])
def new_word():
    """Fetch a new word for a new game."""
    global SECRET_WORD
    SECRET_WORD = get_random_secret_word()
    return jsonify({"message": "New game started!"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
