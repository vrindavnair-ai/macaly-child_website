// Global variables
let currentSection = 'welcome';
let gameScore = 0;
let currentRiddleId = 0;
let currentAnimalId = 0;
let riddles = [];
let animals = [];
let currentMathProblem = { a: 0, b: 0, operator: '+' };
let memorySequence = [];
let userMemorySequence = [];
let memoryEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('KidsChat Playground initialized');
    setupNavigation();
    setupChat();
    setupGames();
    loadGameData();
    updateMessageTime();
});

// Navigation setup
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionName) {
    console.log(`Switching to section: ${sectionName}`);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionName).classList.add('active');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    currentSection = sectionName;
}

// Chat functionality
function setupChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    console.log('Sending message:', message);
    
    // Add user message to chat
    addMessageToChat(message, true);
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        // Hide typing indicator
        hideTypingIndicator();
        
        if (response.ok) {
            // Add bot response to chat
            setTimeout(() => {
                addMessageToChat(data.response, false);
            }, 500);
        } else {
            addMessageToChat("Sorry, I had trouble understanding that! Let's try again! 😊", false);
        }
    } catch (error) {
        console.error('Chat error:', error);
        hideTypingIndicator();
        addMessageToChat("Oops! Something went wrong. Let's try again! 😊", false);
    }
}

function addMessageToChat(message, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    if (isUser) {
        messageDiv.innerHTML = `
            <p class="message-text">${message}</p>
            <p class="message-time">${timeString}</p>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="bot-emoji">🤖</span>
                <span class="bot-name">Robo</span>
            </div>
            <p class="message-text">${message}</p>
            <p class="message-time">${timeString}</p>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    console.log('Message added to chat:', message, 'isUser:', isUser);
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'block';
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}

function updateMessageTime() {
    const firstMessage = document.querySelector('.message-time');
    if (firstMessage) {
        firstMessage.textContent = new Date().toLocaleTimeString();
    }
}

// Games functionality
function setupGames() {
    // Game selection
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameType = this.getAttribute('data-game');
            startGame(gameType);
        });
    });
    
    // Riddle game
    document.getElementById('riddleSubmit').addEventListener('click', submitRiddleAnswer);
    document.getElementById('riddleAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') submitRiddleAnswer();
    });
    
    // Math game
    document.getElementById('mathSubmit').addEventListener('click', submitMathAnswer);
    document.getElementById('mathAnswer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') submitMathAnswer();
    });
    
    // Memory game
    document.getElementById('memoryStart').addEventListener('click', startMemoryGame);
    
    // Animal guessing game
    document.getElementById('guessSubmit').addEventListener('click', submitAnimalGuess);
    document.getElementById('animalGuess').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') submitAnimalGuess();
    });
}

async function loadGameData() {
    try {
        // Load riddles
        const riddlesResponse = await fetch('/riddles');
        const riddlesData = await riddlesResponse.json();
        riddles = riddlesData.riddles;
        
        // Load animals
        const animalsResponse = await fetch('/animals');
        const animalsData = await animalsResponse.json();
        animals = animalsData.animals;
        
        console.log('Game data loaded:', { riddles: riddles.length, animals: animals.length });
    } catch (error) {
        console.error('Error loading game data:', error);
    }
}

function startGame(gameType) {
    console.log('Starting game:', gameType);
    
    // Hide game selection
    document.getElementById('gameSelection').style.display = 'none';
    
    // Show specific game
    document.getElementById(`${gameType}Game`).style.display = 'block';
    
    // Initialize game
    switch (gameType) {
        case 'riddle':
            initializeRiddleGame();
            break;
        case 'math':
            initializeMathGame();
            break;
        case 'memory':
            initializeMemoryGame();
            break;
        case 'guess':
            initializeGuessGame();
            break;
    }
}

function backToGameSelection() {
    console.log('Returning to game selection');
    
    // Hide all games
    document.querySelectorAll('.game-play').forEach(game => {
        game.style.display = 'none';
    });
    
    // Show game selection
    document.getElementById('gameSelection').style.display = 'grid';
    
    // Reset game states
    resetGameStates();
}

function resetGameStates() {
    // Reset riddle game
    document.getElementById('riddleFeedback').style.display = 'none';
    document.getElementById('riddleAnswer').value = '';
    
    // Reset math game
    document.getElementById('mathFeedback').style.display = 'none';
    document.getElementById('mathAnswer').value = '';
    
    // Reset memory game
    document.getElementById('memoryInstructions').style.display = 'block';
    document.getElementById('memorySequence').style.display = 'none';
    document.getElementById('memoryInput').style.display = 'none';
    document.getElementById('memoryFeedback').style.display = 'none';
    
    // Reset guess game
    document.getElementById('guessFeedback').style.display = 'none';
    document.getElementById('animalGuess').value = '';
}

// Riddle Game
function initializeRiddleGame() {
    if (riddles.length === 0) return;
    
    currentRiddleId = Math.floor(Math.random() * riddles.length);
    displayRiddle();
}

function displayRiddle() {
    const riddle = riddles[currentRiddleId];
    document.getElementById('riddleNumber').textContent = currentRiddleId + 1;
    document.getElementById('riddleQuestion').textContent = riddle.question;
    document.getElementById('riddleHint').textContent = riddle.hint;
    document.getElementById('riddleFeedback').style.display = 'none';
    document.getElementById('riddleAnswer').value = '';
    
    console.log('Displaying riddle:', riddle.question);
}

async function submitRiddleAnswer() {
    const answer = document.getElementById('riddleAnswer').value.trim();
    if (!answer) return;
    
    console.log('Submitting riddle answer:', answer);
    
    try {
        const response = await fetch('/check_riddle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                riddle_id: currentRiddleId, 
                answer: answer 
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayRiddleFeedback(data.correct, data.answer, data.points);
            if (data.correct) {
                updateScore('riddle', data.points);
            }
        } else {
            displayRiddleFeedback(false, riddles[currentRiddleId].answer, 0);
        }
    } catch (error) {
        console.error('Error checking riddle:', error);
        displayRiddleFeedback(false, riddles[currentRiddleId].answer, 0);
    }
}

function displayRiddleFeedback(correct, answer, points) {
    const feedback = document.getElementById('riddleFeedback');
    
    if (correct) {
        feedback.innerHTML = `
            <p>🎉 Correct! Great job! 🎉</p>
            <button onclick="nextRiddle()">Next Riddle! 🎯</button>
        `;
    } else {
        feedback.innerHTML = `
            <p>😊 Good try! The answer is: ${answer}</p>
            <button onclick="nextRiddle()">Next Riddle! 🎯</button>
        `;
    }
    
    feedback.style.display = 'block';
    console.log('Riddle feedback displayed:', correct, answer);
}

function nextRiddle() {
    currentRiddleId = (currentRiddleId + 1) % riddles.length;
    displayRiddle();
}

// Math Game
function initializeMathGame() {
    generateMathProblem();
}

function generateMathProblem() {
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let a, b;
    
    switch (operator) {
        case '+':
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            break;
        case '-':
            a = Math.floor(Math.random() * 20) + 10;
            b = Math.floor(Math.random() * a) + 1;
            break;
        case '×':
            a = Math.floor(Math.random() * 10) + 1;
            b = Math.floor(Math.random() * 10) + 1;
            break;
    }
    
    currentMathProblem = { a, b, operator };
    document.getElementById('mathProblem').textContent = `${a} ${operator} ${b} = ?`;
    document.getElementById('mathFeedback').style.display = 'none';
    document.getElementById('mathAnswer').value = '';
    
    console.log('Generated math problem:', currentMathProblem);
}

async function submitMathAnswer() {
    const answer = document.getElementById('mathAnswer').value.trim();
    if (!answer) return;
    
    const correctAnswer = calculateMathAnswer();
    const isCorrect = parseInt(answer) === correctAnswer;
    
    console.log('Math answer submitted:', answer, 'Correct:', correctAnswer, 'Is correct:', isCorrect);
    
    displayMathFeedback(isCorrect, correctAnswer);
    
    if (isCorrect) {
        updateScore('math', 15);
    }
}

function calculateMathAnswer() {
    const { a, b, operator } = currentMathProblem;
    
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        default:
            return 0;
    }
}

function displayMathFeedback(correct, answer) {
    const feedback = document.getElementById('mathFeedback');
    
    if (correct) {
        feedback.innerHTML = `
            <p>🎉 Excellent! You got it right! 🎉</p>
            <button onclick="generateMathProblem()">Next Problem! 🎯</button>
        `;
    } else {
        feedback.innerHTML = `
            <p>😊 Good try! The answer is: ${answer}</p>
            <button onclick="generateMathProblem()">Next Problem! 🎯</button>
        `;
    }
    
    feedback.style.display = 'block';
}

// Memory Game
function initializeMemoryGame() {
    document.getElementById('memoryInstructions').style.display = 'block';
    document.getElementById('memorySequence').style.display = 'none';
    document.getElementById('memoryInput').style.display = 'none';
    document.getElementById('memoryFeedback').style.display = 'none';
}

function startMemoryGame() {
    const length = Math.min(3 + Math.floor(gameScore / 50), 6);
    memorySequence = [];
    userMemorySequence = [];
    
    for (let i = 0; i < length; i++) {
        memorySequence.push(memoryEmojis[Math.floor(Math.random() * memoryEmojis.length)]);
    }
    
    console.log('Memory game started with sequence:', memorySequence);
    
    // Hide instructions
    document.getElementById('memoryInstructions').style.display = 'none';
    
    // Show sequence
    displayMemorySequence();
    
    // Hide sequence and show input after 3 seconds
    setTimeout(() => {
        document.getElementById('memorySequence').style.display = 'none';
        showMemoryInput();
    }, 3000);
}

function displayMemorySequence() {
    const sequenceDiv = document.getElementById('memorySequence');
    sequenceDiv.innerHTML = '<p>Remember this sequence! 👀</p>';
    
    const emojisDiv = document.createElement('div');
    emojisDiv.style.display = 'flex';
    emojisDiv.style.justifyContent = 'center';
    emojisDiv.style.gap = '20px';
    
    memorySequence.forEach((emoji, index) => {
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emoji;
        emojiSpan.className = 'emoji bounce';
        emojiSpan.style.fontSize = '3rem';
        emojiSpan.style.animationDelay = `${index * 0.2}s`;
        emojisDiv.appendChild(emojiSpan);
    });
    
    sequenceDiv.appendChild(emojisDiv);
    sequenceDiv.style.display = 'block';
}

function showMemoryInput() {
    const inputDiv = document.getElementById('memoryInput');
    const grid = inputDiv.querySelector('.memory-grid');
    
    grid.innerHTML = '';
    
    memoryEmojis.forEach(emoji => {
        const button = document.createElement('button');
        button.textContent = emoji;
        button.className = 'memory-emoji-btn';
        button.onclick = () => selectMemoryEmoji(emoji);
        grid.appendChild(button);
    });
    
    inputDiv.style.display = 'block';
}

function selectMemoryEmoji(emoji) {
    userMemorySequence.push(emoji);
    
    console.log('User selected emoji:', emoji, 'Current sequence:', userMemorySequence);
    
    if (userMemorySequence.length === memorySequence.length) {
        checkMemorySequence();
    }
}

function checkMemorySequence() {
    const isCorrect = userMemorySequence.every((emoji, index) => emoji === memorySequence[index]);
    
    console.log('Memory sequence check:', isCorrect);
    
    // Hide input
    document.getElementById('memoryInput').style.display = 'none';
    
    // Show feedback
    const feedback = document.getElementById('memoryFeedback');
    
    if (isCorrect) {
        feedback.innerHTML = `
            <p>🎉 Amazing memory! You got it perfect! 🎉</p>
            <button onclick="initializeMemoryGame()">Play Again! 🎯</button>
        `;
        updateScore('memory', 20);
    } else {
        feedback.innerHTML = `
            <p>😊 Good try! Let's practice more!</p>
            <button onclick="initializeMemoryGame()">Play Again! 🎯</button>
        `;
    }
    
    feedback.style.display = 'block';
}

// Animal Guessing Game
function initializeGuessGame() {
    if (animals.length === 0) return;
    
    currentAnimalId = Math.floor(Math.random() * animals.length);
    displayAnimalClues();
}

function displayAnimalClues() {
    const animal = animals[currentAnimalId];
    const cluesDiv = document.getElementById('animalClues');
    
    cluesDiv.innerHTML = '';
    animal.clues.forEach(clue => {
        const clueP = document.createElement('p');
        clueP.textContent = clue;
        cluesDiv.appendChild(clueP);
    });
    
    document.getElementById('guessFeedback').style.display = 'none';
    document.getElementById('animalGuess').value = '';
    
    console.log('Displaying animal clues for:', animal.name);
}

async function submitAnimalGuess() {
    const guess = document.getElementById('animalGuess').value.trim();
    if (!guess) return;
    
    console.log('Submitting animal guess:', guess);
    
    try {
        const response = await fetch('/check_animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                animal_id: currentAnimalId, 
                guess: guess 
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayAnimalFeedback(data.correct, data.answer, data.emoji, data.points);
            if (data.correct) {
                updateScore('guess', data.points);
            }
        } else {
            displayAnimalFeedback(false, animals[currentAnimalId].name, animals[currentAnimalId].emoji, 0);
        }
    } catch (error) {
        console.error('Error checking animal guess:', error);
        displayAnimalFeedback(false, animals[currentAnimalId].name, animals[currentAnimalId].emoji, 0);
    }
}

function displayAnimalFeedback(correct, answer, emoji, points) {
    const feedback = document.getElementById('guessFeedback');
    
    feedback.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">${emoji}</div>
        <p>${correct ? '🎉 Correct! Great job! 🎉' : `😊 Good try! It's a ${answer}!`}</p>
        <button onclick="nextAnimal()">Next Animal! 🎯</button>
    `;
    
    feedback.style.display = 'block';
    console.log('Animal feedback displayed:', correct, answer);
}

function nextAnimal() {
    currentAnimalId = (currentAnimalId + 1) % animals.length;
    displayAnimalClues();
}

// Score management
function updateScore(gameType, points) {
    gameScore += points;
    document.getElementById(`${gameType}Score`).textContent = gameScore;
    
    console.log(`Score updated for ${gameType}:`, points, 'Total:', gameScore);
}