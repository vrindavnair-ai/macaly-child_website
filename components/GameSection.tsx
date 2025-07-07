'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function GameSection() {
  const [activeGame, setActiveGame] = useState<'none' | 'riddle' | 'math' | 'memory' | 'guess'>('none');
  const [score, setScore] = useState(0);

  console.log('GameSection rendered with activeGame:', activeGame);

  return (
    <div className="space-y-6">
      {/* Game Selection */}
      {activeGame === 'none' && <GameSelection onSelectGame={setActiveGame} />}
      
      {/* Game Components */}
      {activeGame === 'riddle' && (
        <RiddleGame 
          onBack={() => setActiveGame('none')} 
          score={score}
          onScoreChange={setScore}
        />
      )}
      {activeGame === 'math' && (
        <MathGame 
          onBack={() => setActiveGame('none')} 
          score={score}
          onScoreChange={setScore}
        />
      )}
      {activeGame === 'memory' && (
        <MemoryGame 
          onBack={() => setActiveGame('none')} 
          score={score}
          onScoreChange={setScore}
        />
      )}
      {activeGame === 'guess' && (
        <GuessGame 
          onBack={() => setActiveGame('none')} 
          score={score}
          onScoreChange={setScore}
        />
      )}
    </div>
  );
}

function GameSelection({ onSelectGame }: { onSelectGame: (game: 'riddle' | 'math' | 'memory' | 'guess') => void }) {
  const games = [
    {
      id: 'riddle' as const,
      title: 'Riddle Time! 🧩',
      description: 'Solve fun riddles and brain teasers!',
      color: 'kid-coral',
      emoji: '🧩'
    },
    {
      id: 'math' as const,
      title: 'Math Adventure! 🔢',
      description: 'Practice math with fun problems!',
      color: 'kid-turquoise',
      emoji: '🔢'
    },
    {
      id: 'memory' as const,
      title: 'Memory Challenge! 🧠',
      description: 'Test your memory with emoji patterns!',
      color: 'kid-yellow',
      emoji: '🧠'
    },
    {
      id: 'guess' as const,
      title: 'Animal Guessing! 🐾',
      description: 'Guess the animal from clues!',
      color: 'kid-purple',
      emoji: '🐾'
    }
  ];

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-8 text-kid-coral" data-macaly="games-title">
        🎮 Choose Your Game! 🎮
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => onSelectGame(game.id)}
          >
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 animate-bounce-gentle">
                {game.emoji}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${
                game.color === 'kid-coral' ? 'text-kid-coral' :
                game.color === 'kid-turquoise' ? 'text-kid-turquoise' :
                game.color === 'kid-yellow' ? 'text-kid-yellow' :
                'text-kid-purple'
              }`}>
                {game.title}
              </h3>
              <p className="text-gray-600 text-lg mb-4">
                {game.description}
              </p>
              <Button
                className={`w-full py-3 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 text-white ${
                  game.color === 'kid-coral' ? 'bg-kid-coral hover:bg-kid-coral/80' :
                  game.color === 'kid-turquoise' ? 'bg-kid-turquoise hover:bg-kid-turquoise/80' :
                  game.color === 'kid-yellow' ? 'bg-kid-yellow hover:bg-kid-yellow/80 text-gray-800' :
                  'bg-kid-purple hover:bg-kid-purple/80'
                }`}
              >
                Play Now! 🚀
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RiddleGame({ onBack, score, onScoreChange }: { onBack: () => void; score: number; onScoreChange: (score: number) => void }) {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState('');

  const riddles = [
    {
      question: "I have a tail and four legs, I bark and I'm loyal. What am I?",
      answer: "dog",
      hint: "I'm man's best friend! 🐕"
    },
    {
      question: "I'm yellow and I light up the day. I'm very hot and far away. What am I?",
      answer: "sun",
      hint: "I'm in the sky and give us light! ☀️"
    },
    {
      question: "I have wings but I'm not a bird. I'm colorful and visit flowers. What am I?",
      answer: "butterfly",
      hint: "I start as a caterpillar! 🦋"
    },
    {
      question: "I'm white and cold, I fall from the sky in winter. What am I?",
      answer: "snow",
      hint: "Kids love to build snowmen with me! ❄️"
    }
  ];

  const handleSubmit = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === riddles[currentRiddle].answer.toLowerCase();
    
    if (isCorrect) {
      setFeedback('🎉 Correct! Great job! 🎉');
      onScoreChange(score + 10);
    } else {
      setFeedback('😊 Good try! The answer is: ' + riddles[currentRiddle].answer);
    }
    
    setShowAnswer(true);
    console.log('Riddle answered:', userAnswer, 'Correct:', isCorrect);
  };

  const nextRiddle = () => {
    setCurrentRiddle((prev) => (prev + 1) % riddles.length);
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback('');
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-kid-coral to-kid-pink text-white p-6">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <span className="animate-bounce-gentle">🧩</span>
          Riddle Time!
          <span className="animate-bounce-gentle">🧩</span>
        </CardTitle>
        <p className="text-center text-lg">Score: {score} points! 🌟</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-4 text-kid-coral">
            Riddle #{currentRiddle + 1}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {riddles[currentRiddle].question}
          </p>
          <p className="text-sm text-kid-turquoise italic">
            {riddles[currentRiddle].hint}
          </p>
        </div>

        {!showAnswer ? (
          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="text-lg p-4 rounded-2xl border-2 border-kid-coral/30 focus:border-kid-coral"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              className="w-full bg-kid-coral hover:bg-kid-coral/80 text-white py-3 rounded-2xl font-bold text-lg"
              disabled={!userAnswer.trim()}
            >
              Submit Answer! 🚀
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-kid-turquoise">
              {feedback}
            </p>
            <Button
              onClick={nextRiddle}
              className="bg-kid-yellow hover:bg-kid-yellow/80 text-gray-800 py-3 px-6 rounded-2xl font-bold text-lg"
            >
              Next Riddle! 🎯
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full text-kid-coral border-2 border-kid-coral hover:bg-kid-coral hover:text-white py-3 rounded-2xl font-bold"
          >
            Back to Games 🏠
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MathGame({ onBack, score, onScoreChange }: { onBack: () => void; score: number; onScoreChange: (score: number) => void }) {
  const [problem, setProblem] = useState({ a: 0, b: 0, operator: '+' });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const generateProblem = () => {
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
      default:
        a = 5;
        b = 3;
    }

    setProblem({ a, b, operator });
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback('');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const getCorrectAnswer = () => {
    switch (problem.operator) {
      case '+':
        return problem.a + problem.b;
      case '-':
        return problem.a - problem.b;
      case '×':
        return problem.a * problem.b;
      default:
        return 0;
    }
  };

  const handleSubmit = () => {
    const correctAnswer = getCorrectAnswer();
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    
    if (isCorrect) {
      setFeedback('🎉 Excellent! You got it right! 🎉');
      onScoreChange(score + 15);
    } else {
      setFeedback(`😊 Good try! The answer is: ${correctAnswer}`);
    }
    
    setShowAnswer(true);
    console.log('Math problem answered:', userAnswer, 'Correct answer:', correctAnswer);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-kid-turquoise to-kid-blue text-white p-6">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <span className="animate-bounce-gentle">🔢</span>
          Math Adventure!
          <span className="animate-bounce-gentle">🔢</span>
        </CardTitle>
        <p className="text-center text-lg">Score: {score} points! 🌟</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-kid-turquoise mb-4">
            {problem.a} {problem.operator} {problem.b} = ?
          </div>
        </div>

        {!showAnswer ? (
          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              type="number"
              className="text-lg p-4 rounded-2xl border-2 border-kid-turquoise/30 focus:border-kid-turquoise text-center"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              className="w-full bg-kid-turquoise hover:bg-kid-turquoise/80 text-white py-3 rounded-2xl font-bold text-lg"
              disabled={!userAnswer.trim()}
            >
              Submit Answer! 🚀
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-kid-turquoise">
              {feedback}
            </p>
            <Button
              onClick={generateProblem}
              className="bg-kid-yellow hover:bg-kid-yellow/80 text-gray-800 py-3 px-6 rounded-2xl font-bold text-lg"
            >
              Next Problem! 🎯
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full text-kid-turquoise border-2 border-kid-turquoise hover:bg-kid-turquoise hover:text-white py-3 rounded-2xl font-bold"
          >
            Back to Games 🏠
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MemoryGame({ onBack, score, onScoreChange }: { onBack: () => void; score: number; onScoreChange: (score: number) => void }) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);
  const [gameState, setGameState] = useState<'waiting' | 'showing' | 'input' | 'feedback'>('waiting');
  const [feedback, setFeedback] = useState('');

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  const startGame = () => {
    const newSequence: string[] = [];
    const length = Math.min(3 + Math.floor(score / 50), 6); // Gradually increase difficulty
    
    for (let i = 0; i < length; i++) {
      newSequence.push(emojis[Math.floor(Math.random() * emojis.length)]);
    }
    
    setSequence(newSequence);
    setUserSequence([]);
    setGameState('showing');
    setShowSequence(true);
    
    console.log('Memory game started with sequence:', newSequence);
    
    // Hide sequence after 3 seconds
    setTimeout(() => {
      setShowSequence(false);
      setGameState('input');
    }, 3000);
  };

  const handleEmojiClick = (emoji: string) => {
    if (gameState !== 'input') return;
    
    const newUserSequence = [...userSequence, emoji];
    setUserSequence(newUserSequence);
    
    console.log('User clicked emoji:', emoji, 'Current sequence:', newUserSequence);
    
    if (newUserSequence.length === sequence.length) {
      checkAnswer(newUserSequence);
    }
  };

  const checkAnswer = (userSeq: string[]) => {
    const isCorrect = userSeq.every((emoji, index) => emoji === sequence[index]);
    
    if (isCorrect) {
      setFeedback('🎉 Amazing memory! You got it perfect! 🎉');
      onScoreChange(score + 20);
    } else {
      setFeedback('😊 Good try! Let\'s practice more!');
    }
    
    setGameState('feedback');
    console.log('Memory game result:', isCorrect);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-kid-yellow to-kid-orange text-white p-6">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <span className="animate-bounce-gentle">🧠</span>
          Memory Challenge!
          <span className="animate-bounce-gentle">🧠</span>
        </CardTitle>
        <p className="text-center text-lg">Score: {score} points! 🌟</p>
      </CardHeader>
      <CardContent className="p-8">
        {gameState === 'waiting' && (
          <div className="text-center space-y-4">
            <p className="text-xl text-gray-700">
              Remember the sequence of emojis! 🎯
            </p>
            <Button
              onClick={startGame}
              className="bg-kid-yellow hover:bg-kid-yellow/80 text-gray-800 py-3 px-6 rounded-2xl font-bold text-lg"
            >
              Start Game! 🚀
            </Button>
          </div>
        )}

        {gameState === 'showing' && (
          <div className="text-center space-y-4">
            <p className="text-xl text-kid-yellow font-bold">
              Remember this sequence! 👀
            </p>
            <div className="flex justify-center gap-4">
              {sequence.map((emoji, index) => (
                <div
                  key={index}
                  className="text-5xl animate-bounce-gentle"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'input' && (
          <div className="space-y-6">
            <p className="text-xl text-center font-bold text-kid-yellow">
              Click the emojis in the same order! 🎯
            </p>
            
            <div className="text-center mb-4">
              <p className="text-lg text-gray-600">
                Your sequence: {userSequence.join(' ')}
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {emojis.map((emoji, index) => (
                <Button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-4xl p-6 bg-white hover:bg-kid-yellow/20 border-2 border-kid-yellow/30 rounded-2xl transition-all duration-200 transform hover:scale-105"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'feedback' && (
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-kid-yellow">
              {feedback}
            </p>
            <Button
              onClick={() => setGameState('waiting')}
              className="bg-kid-yellow hover:bg-kid-yellow/80 text-gray-800 py-3 px-6 rounded-2xl font-bold text-lg"
            >
              Play Again! 🎯
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full text-kid-yellow border-2 border-kid-yellow hover:bg-kid-yellow hover:text-gray-800 py-3 rounded-2xl font-bold"
          >
            Back to Games 🏠
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function GuessGame({ onBack, score, onScoreChange }: { onBack: () => void; score: number; onScoreChange: (score: number) => void }) {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState('');

  const animals = [
    {
      name: 'elephant',
      clues: [
        'I am very big and gray! 🐘',
        'I have a long nose called a trunk!',
        'I never forget anything!',
        'I love to spray water on myself!'
      ],
      emoji: '🐘'
    },
    {
      name: 'lion',
      clues: [
        'I am the king of the jungle! 🦁',
        'I have a big mane around my face!',
        'I make a loud roaring sound!',
        'I have golden fur!'
      ],
      emoji: '🦁'
    },
    {
      name: 'penguin',
      clues: [
        'I live in very cold places! 🐧',
        'I am black and white!',
        'I can\'t fly but I love to swim!',
        'I slide on my belly on the ice!'
      ],
      emoji: '🐧'
    },
    {
      name: 'butterfly',
      clues: [
        'I have beautiful colorful wings! 🦋',
        'I start life as a caterpillar!',
        'I love to visit flowers!',
        'I can fly but I\'m not a bird!'
      ],
      emoji: '🦋'
    }
  ];

  const handleGuess = () => {
    const isCorrect = userGuess.toLowerCase().trim() === animals[currentAnimal].name.toLowerCase();
    
    if (isCorrect) {
      setGuessedCorrectly(true);
      onScoreChange(score + 25);
    }
    
    setShowAnswer(true);
    console.log('Animal guessed:', userGuess, 'Correct:', isCorrect);
  };

  const nextAnimal = () => {
    setCurrentAnimal((prev) => (prev + 1) % animals.length);
    setUserGuess('');
    setShowAnswer(false);
    setGuessedCorrectly(false);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-kid-purple to-kid-pink text-white p-6">
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <span className="animate-bounce-gentle">🐾</span>
          Animal Guessing!
          <span className="animate-bounce-gentle">🐾</span>
        </CardTitle>
        <p className="text-center text-lg">Score: {score} points! 🌟</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-4 text-kid-purple">
            Guess the Animal! 🔍
          </h3>
          <div className="space-y-2">
            {animals[currentAnimal].clues.map((clue, index) => (
              <p key={index} className="text-lg text-gray-700">
                {clue}
              </p>
            ))}
          </div>
        </div>

        {!showAnswer ? (
          <div className="space-y-4">
            <Input
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="What animal am I?"
              className="text-lg p-4 rounded-2xl border-2 border-kid-purple/30 focus:border-kid-purple"
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            />
            <Button
              onClick={handleGuess}
              className="w-full bg-kid-purple hover:bg-kid-purple/80 text-white py-3 rounded-2xl font-bold text-lg"
              disabled={!userGuess.trim()}
            >
              Submit Guess! 🚀
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">
              {animals[currentAnimal].emoji}
            </div>
            <p className="text-xl font-bold text-kid-purple">
              {guessedCorrectly ? 
                '🎉 Correct! Great job! 🎉' : 
                `😊 Good try! It's a ${animals[currentAnimal].name}!`
              }
            </p>
            <Button
              onClick={nextAnimal}
              className="bg-kid-yellow hover:bg-kid-yellow/80 text-gray-800 py-3 px-6 rounded-2xl font-bold text-lg"
            >
              Next Animal! 🎯
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full text-kid-purple border-2 border-kid-purple hover:bg-kid-purple hover:text-white py-3 rounded-2xl font-bold"
          >
            Back to Games 🏠
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}