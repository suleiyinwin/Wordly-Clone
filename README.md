# Wordly Clone

A Wordle-like game built using React (Vite) for the frontend and Flask for the backend.

---

## Features

- Interactive gameplay with a 5-letter word guessing system.
- Supports both physical and on-screen keyboard.
- Live color feedback for correct, misplaced, and wrong letters.
- Start a new game anytime.
- Checks words using a real dictionary API.
- Soft pale blue gradient background for a modern look.
- Score tracking (Earn points when you win).

---

## Project Structure

```
📂 wordly-clone
 ├── 📂 frontend (React + Vite)
 │    ├── 📂 src
 │    │    ├── App.js
 │    │    ├── App.css
 │    │    ├── index.js
 │    ├── package.json
 │    ├── vite.config.js
 │    ├── .gitignore
 │    ├── README.md
 │
 ├── 📂 backend (Flask API)
 │    ├── app.py
 │
 ├── README.md (This file)
```

---

## Installation and Setup

### Clone the Repository

```sh
git clone https://github.com/your-username/wordly-clone.git
cd wordly-clone
```

---

## Frontend (React + Vite) Setup

### Install Dependencies

```sh
cd frontend
npm install
```

### Start the Frontend

```sh
npm run dev
```

This will run the React app on `http://localhost:5173`.

---

## Backend (Flask) Setup

### Create a Virtual Environment (Optional but Recommended)

```sh
cd backend
python3 -m venv venv
source venv/bin/activate  # For macOS/Linux
venv\Scripts\activate     # For Windows
```

### Install Python Dependencies

```sh
pip install flask flask-cors
```

### Start the Backend

```sh
python app.py
```

This will run the Flask server on `http://localhost:5001`.

---

## How to Play

1. Guess the secret 5-letter word in 6 attempts.
2. Colors indicate correctness:
   - Green: Correct letter, correct position.
   - Yellow: Correct letter, wrong position.
   - Red: Letter not in the word.
3. Use your keyboard or the on-screen keyboard.
4. Press Submit to check your word.
5. Click New Game anytime to restart.

---

## API Endpoints

### `/guess` (POST)

Checks if the guessed word is valid and returns feedback.

**Request:**
```json
{
  "word": "apple"
}
```

**Response:**
```json
{
  "result": ["correct", "absent", "present", "correct", "absent"],
  "win": false
}
```

### `/new-word` (GET)

Starts a new game with a fresh random word.

---
