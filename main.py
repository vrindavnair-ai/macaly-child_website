from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import random
import json
import os
from typing import List, Dict, Any

app = FastAPI(title="KidsChat Playground", description="A kid-friendly chatbot and games platform")

# Create templates directory if it doesn't exist
if not os.path.exists("templates"):
    os.makedirs("templates")

# Create static directory if it doesn't exist
if not os.path.exists("static"):
    os.makedirs("static")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates configuration
templates = Jinja2Templates(directory="templates")

# Kid-safe content filter
INAPPROPRIATE_WORDS = ['bad', 'stupid', 'hate', 'kill', 'die', 'dumb', 'shut up', 'idiot']

def filter_inappropriate_content(message: str) -> bool:
    """Check if message contains inappropriate content"""
    lower_message = message.lower()
    return any(word in lower_message for word in INAPPROPRIATE_WORDS)

def generate_kid_safe_response(user_message: str) -> str:
    """Generate a kid-safe response to user message"""
    lower_message = user_message.lower()
    
    print(f"Generating response for: {user_message}")
    
    # Content filter check
    if filter_inappropriate_content(user_message):
        return "Let's keep our conversation positive and fun! 😊 How about we talk about something cool instead? What's your favorite animal? 🐾"
    
    # Name responses
    if any(phrase in lower_message for phrase in ['my name is', "i'm ", 'call me']):
        import re
        name_match = re.search(r'(?:my name is|i\'m|call me)\s+(\w+)', user_message, re.IGNORECASE)
        name = name_match.group(1) if name_match else 'friend'
        return f"Nice to meet you, {name}! 🎉 That's such a cool name! What would you like to chat about today? We could talk about animals, games, or I could tell you a fun fact! 🌟"
    
    # Greetings
    if any(word in lower_message for word in ['hi', 'hello', 'hey']):
        return "Hello there! 👋 I'm so happy to see you! How are you feeling today? 😊"
    
    # Animals
    if any(word in lower_message for word in ['animal', 'dog', 'cat', 'bird', 'pet']):
        return "I LOVE animals! 🐾 Did you know that a group of flamingos is called a 'flamboyance'? So fancy! What's your favorite animal? I'd love to share a fun fact about it! 🦩✨"
    
    # Games
    if any(word in lower_message for word in ['game', 'play', 'fun']):
        return "Games are awesome! 🎮 I love playing word games, riddles, and brain teasers! Want to play a quick game? I could ask you a riddle or we could play 20 questions! What sounds fun to you? 🎲"
    
    # Colors
    if any(word in lower_message for word in ['color', 'blue', 'red', 'green', 'yellow', 'purple']):
        return "Ooh, colors! 🌈 I love all the bright, beautiful colors! Did you know that mixing blue and yellow makes green? What's your favorite color? I bet it's super cool! 🎨"
    
    # School/Learning
    if any(word in lower_message for word in ['school', 'learn', 'homework', 'teacher']):
        return "Learning is so exciting! 📚 I love discovering new things every day! What's your favorite subject in school? I think learning is like going on treasure hunts for knowledge! 🏆✨"
    
    # Food
    if any(word in lower_message for word in ['food', 'eat', 'hungry', 'snack']):
        return "Food is yummy! 🍎 I love hearing about all the tasty things kids enjoy! What's your favorite healthy snack? I think fruits are like nature's candy! 🍓🍌"
    
    # Age
    if any(word in lower_message for word in ['old', 'age', 'years']):
        return "Growing up is so exciting! 🌱 Every year you get to learn new things and have new adventures! What's the coolest thing you've learned this year? 🎓"
    
    # Random encouraging responses
    encouraging_responses = [
        "That's really interesting! 🤔 Tell me more about it! I love learning new things from awesome kids like you! ✨",
        "Wow, you're so smart! 🧠 I'm always amazed by how much kids know! What else would you like to chat about? 😊",
        "That's so cool! 🎉 You know what? You're a really fun person to chat with! What makes you happy? 🌟",
        "I love talking with you! 💫 You have such interesting thoughts! What's something that makes you laugh? 😄",
        "You're awesome! 🌈 I'm learning so much from our conversation! What's your favorite thing to do for fun? 🎨"
    ]
    
    return random.choice(encouraging_responses)

# Game data
RIDDLES = [
    {
        "question": "I have a tail and four legs, I bark and I'm loyal. What am I?",
        "answer": "dog",
        "hint": "I'm man's best friend! 🐕"
    },
    {
        "question": "I'm yellow and I light up the day. I'm very hot and far away. What am I?",
        "answer": "sun",
        "hint": "I'm in the sky and give us light! ☀️"
    },
    {
        "question": "I have wings but I'm not a bird. I'm colorful and visit flowers. What am I?",
        "answer": "butterfly",
        "hint": "I start as a caterpillar! 🦋"
    },
    {
        "question": "I'm white and cold, I fall from the sky in winter. What am I?",
        "answer": "snow",
        "hint": "Kids love to build snowmen with me! ❄️"
    }
]

ANIMALS = [
    {
        "name": "elephant",
        "clues": [
            "I am very big and gray! 🐘",
            "I have a long nose called a trunk!",
            "I never forget anything!",
            "I love to spray water on myself!"
        ],
        "emoji": "🐘"
    },
    {
        "name": "lion",
        "clues": [
            "I am the king of the jungle! 🦁",
            "I have a big mane around my face!",
            "I make a loud roaring sound!",
            "I have golden fur!"
        ],
        "emoji": "🦁"
    },
    {
        "name": "penguin",
        "clues": [
            "I live in very cold places! 🐧",
            "I am black and white!",
            "I can't fly but I love to swim!",
            "I slide on my belly on the ice!"
        ],
        "emoji": "🐧"
    },
    {
        "name": "butterfly",
        "clues": [
            "I have beautiful colorful wings! 🦋",
            "I start life as a caterpillar!",
            "I love to visit flowers!",
            "I can fly but I'm not a bird!"
        ],
        "emoji": "🦋"
    }
]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the main page"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def chat_endpoint(request: Request):
    """Handle chat messages"""
    try:
        data = await request.json()
        user_message = data.get("message", "")
        
        if not user_message.strip():
            return JSONResponse({"error": "Empty message"}, status_code=400)
        
        # Generate response
        bot_response = generate_kid_safe_response(user_message)
        
        print(f"User: {user_message}")
        print(f"Bot: {bot_response}")
        
        return JSONResponse({
            "response": bot_response,
            "timestamp": "now"
        })
        
    except Exception as e:
        print(f"Chat error: {e}")
        return JSONResponse({"error": "Something went wrong"}, status_code=500)

@app.get("/riddles")
async def get_riddles():
    """Get all riddles"""
    return JSONResponse({"riddles": RIDDLES})

@app.get("/animals")
async def get_animals():
    """Get all animals for guessing game"""
    return JSONResponse({"animals": ANIMALS})

@app.post("/check_riddle")
async def check_riddle(request: Request):
    """Check riddle answer"""
    try:
        data = await request.json()
        riddle_id = data.get("riddle_id", 0)
        user_answer = data.get("answer", "").lower().strip()
        
        if riddle_id >= len(RIDDLES):
            return JSONResponse({"error": "Invalid riddle ID"}, status_code=400)
        
        correct_answer = RIDDLES[riddle_id]["answer"].lower()
        is_correct = user_answer == correct_answer
        
        return JSONResponse({
            "correct": is_correct,
            "answer": RIDDLES[riddle_id]["answer"],
            "points": 10 if is_correct else 0
        })
        
    except Exception as e:
        print(f"Riddle check error: {e}")
        return JSONResponse({"error": "Something went wrong"}, status_code=500)

@app.post("/check_animal")
async def check_animal(request: Request):
    """Check animal guess"""
    try:
        data = await request.json()
        animal_id = data.get("animal_id", 0)
        user_guess = data.get("guess", "").lower().strip()
        
        if animal_id >= len(ANIMALS):
            return JSONResponse({"error": "Invalid animal ID"}, status_code=400)
        
        correct_answer = ANIMALS[animal_id]["name"].lower()
        is_correct = user_guess == correct_answer
        
        return JSONResponse({
            "correct": is_correct,
            "answer": ANIMALS[animal_id]["name"],
            "emoji": ANIMALS[animal_id]["emoji"],
            "points": 25 if is_correct else 0
        })
        
    except Exception as e:
        print(f"Animal check error: {e}")
        return JSONResponse({"error": "Something went wrong"}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)