'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function WelcomeSection() {
  const [robotEmotion, setRobotEmotion] = useState<'happy' | 'excited' | 'waving'>('happy');

  useEffect(() => {
    const emotions: ('happy' | 'excited' | 'waving')[] = ['happy', 'excited', 'waving'];
    const interval = setInterval(() => {
      setRobotEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log('WelcomeSection rendered with robotEmotion:', robotEmotion);

  const getRobotEmoji = () => {
    switch (robotEmotion) {
      case 'happy': return '🤖';
      case 'excited': return '🤖✨';
      case 'waving': return '🤖👋';
      default: return '🤖';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 animate-bounce-gentle">
            {getRobotEmoji()}
          </div>
          <h3 className="text-2xl font-bold text-kid-coral mb-3" data-macaly="welcome-title">
            Meet Robo!
          </h3>
          <p className="text-gray-600 text-lg" data-macaly="welcome-description">
            Hi there! I'm Robo, your friendly AI buddy! I love to chat about animals, games, 
            books, and help you learn new things! 🌟
          </p>
        </CardContent>
      </Card>

      {/* Safety Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 animate-wiggle">
            🛡️
          </div>
          <h3 className="text-2xl font-bold text-kid-turquoise mb-3" data-macaly="safety-title">
            Super Safe!
          </h3>
          <p className="text-gray-600 text-lg" data-macaly="safety-description">
            This is a safe space for kids! All conversations are monitored and 
            filtered to keep everything fun and appropriate! 😊
          </p>
        </CardContent>
      </Card>

      {/* Fun Features Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 animate-float">
            🎉
          </div>
          <h3 className="text-2xl font-bold text-kid-yellow mb-3" data-macaly="features-title">
            Fun Features!
          </h3>
          <p className="text-gray-600 text-lg" data-macaly="features-description">
            Chat with Robo, play awesome games, learn cool facts, and have tons of fun! 
            Everything is designed just for kids! 🎮
          </p>
        </CardContent>
      </Card>

      {/* Quick Tips Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-3">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-kid-purple mb-4 text-center" data-macaly="tips-title">
            💡 Quick Tips for Fun Chatting!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-kid-coral/10 rounded-2xl">
              <div className="text-3xl mb-2">🗣️</div>
              <p className="text-gray-700 font-semibold">Ask me about your favorite animals!</p>
            </div>
            <div className="p-4 bg-kid-turquoise/10 rounded-2xl">
              <div className="text-3xl mb-2">🎲</div>
              <p className="text-gray-700 font-semibold">Play games and solve puzzles!</p>
            </div>
            <div className="p-4 bg-kid-yellow/10 rounded-2xl">
              <div className="text-3xl mb-2">📚</div>
              <p className="text-gray-700 font-semibold">Learn fun facts and stories!</p>
            </div>
            <div className="p-4 bg-kid-purple/10 rounded-2xl">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-gray-700 font-semibold">Get creative ideas and activities!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}