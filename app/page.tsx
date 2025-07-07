'use client';

import { useState } from 'react';
import { ChatBot } from '@/components/ChatBot';
import { GameSection } from '@/components/GameSection';
import { WelcomeSection } from '@/components/WelcomeSection';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [activeSection, setActiveSection] = useState<'welcome' | 'chat' | 'games'>('welcome');

  console.log('Home page rendered with activeSection:', activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-turquoise/20 to-kid-coral/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 
            className="text-5xl font-bold text-kid-coral mb-4 animate-bounce-gentle"
            data-macaly="main-title"
          >
            🤖 KidsChat Playground! 🎮
          </h1>
          <p 
            className="text-xl text-gray-700 mb-6"
            data-macaly="subtitle"
          >
            Chat with Robo, play games, and have fun! 🌟
          </p>
          
          {/* Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setActiveSection('welcome')}
              variant={activeSection === 'welcome' ? 'default' : 'outline'}
              className={`text-lg px-6 py-3 rounded-3xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeSection === 'welcome' 
                  ? 'bg-kid-coral text-white shadow-lg' 
                  : 'bg-white text-kid-coral border-2 border-kid-coral hover:bg-kid-coral hover:text-white'
              }`}
            >
              🏠 Home
            </Button>
            <Button
              onClick={() => setActiveSection('chat')}
              variant={activeSection === 'chat' ? 'default' : 'outline'}
              className={`text-lg px-6 py-3 rounded-3xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeSection === 'chat' 
                  ? 'bg-kid-turquoise text-white shadow-lg' 
                  : 'bg-white text-kid-turquoise border-2 border-kid-turquoise hover:bg-kid-turquoise hover:text-white'
              }`}
            >
              💬 Chat with Robo
            </Button>
            <Button
              onClick={() => setActiveSection('games')}
              variant={activeSection === 'games' ? 'default' : 'outline'}
              className={`text-lg px-6 py-3 rounded-3xl font-bold transition-all duration-300 transform hover:scale-105 ${
                activeSection === 'games' 
                  ? 'bg-kid-yellow text-gray-800 shadow-lg' 
                  : 'bg-white text-kid-yellow border-2 border-kid-yellow hover:bg-kid-yellow hover:text-gray-800'
              }`}
            >
              🎮 Play Games
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="transition-all duration-500">
          {activeSection === 'welcome' && <WelcomeSection />}
          {activeSection === 'chat' && <ChatBot />}
          {activeSection === 'games' && <GameSection />}
        </main>
      </div>
    </div>
  );
}