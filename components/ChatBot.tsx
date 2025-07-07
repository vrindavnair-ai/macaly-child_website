'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Robo! 🤖 I'm super excited to chat with you! What's your name? 😊",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  console.log('ChatBot rendered with messages:', messages.length);

  // Kid-safe response generator
  const generateKidSafeResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    console.log('Generating response for:', userMessage);
    
    // Content filter - check for inappropriate words
    const inappropriateWords = ['bad', 'stupid', 'hate', 'kill', 'die', 'dumb'];
    const hasInappropriate = inappropriateWords.some(word => lowerMessage.includes(word));
    
    if (hasInappropriate) {
      return "Let's keep our conversation positive and fun! 😊 How about we talk about something cool instead? What's your favorite animal? 🐾";
    }

    // Name responses
    if (lowerMessage.includes('my name is') || lowerMessage.includes("i'm ") || lowerMessage.includes('call me')) {
      const nameMatch = userMessage.match(/(?:my name is|i'm|call me)\s+(\w+)/i);
      const name = nameMatch ? nameMatch[1] : 'friend';
      return `Nice to meet you, ${name}! 🎉 That's such a cool name! What would you like to chat about today? We could talk about animals, games, or I could tell you a fun fact! 🌟`;
    }

    // Greetings
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello there! 👋 I'm so happy to see you! How are you feeling today? 😊";
    }

    // Animals
    if (lowerMessage.includes('animal') || lowerMessage.includes('dog') || lowerMessage.includes('cat') || lowerMessage.includes('bird')) {
      return "I LOVE animals! 🐾 Did you know that a group of flamingos is called a 'flamboyance'? So fancy! What's your favorite animal? I'd love to share a fun fact about it! 🦩✨";
    }

    // Games
    if (lowerMessage.includes('game') || lowerMessage.includes('play') || lowerMessage.includes('fun')) {
      return "Games are awesome! 🎮 I love playing word games, riddles, and brain teasers! Want to play a quick game? I could ask you a riddle or we could play 20 questions! What sounds fun to you? 🎲";
    }

    // Colors
    if (lowerMessage.includes('color') || lowerMessage.includes('blue') || lowerMessage.includes('red') || lowerMessage.includes('green')) {
      return "Ooh, colors! 🌈 I love all the bright, beautiful colors! Did you know that mixing blue and yellow makes green? What's your favorite color? I bet it's super cool! 🎨";
    }

    // School/Learning
    if (lowerMessage.includes('school') || lowerMessage.includes('learn') || lowerMessage.includes('homework')) {
      return "Learning is so exciting! 📚 I love discovering new things every day! What's your favorite subject in school? I think learning is like going on treasure hunts for knowledge! 🏆✨";
    }

    // Food
    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('hungry')) {
      return "Food is yummy! 🍎 I love hearing about all the tasty things kids enjoy! What's your favorite healthy snack? I think fruits are like nature's candy! 🍓🍌";
    }

    // Age
    if (lowerMessage.includes('old') || lowerMessage.includes('age') || lowerMessage.includes('years')) {
      return "Growing up is so exciting! 🌱 Every year you get to learn new things and have new adventures! What's the coolest thing you've learned this year? 🎓";
    }

    // Random encouraging responses
    const encouragingResponses = [
      "That's really interesting! 🤔 Tell me more about it! I love learning new things from awesome kids like you! ✨",
      "Wow, you're so smart! 🧠 I'm always amazed by how much kids know! What else would you like to chat about? 😊",
      "That's so cool! 🎉 You know what? You're a really fun person to chat with! What makes you happy? 🌟",
      "I love talking with you! 💫 You have such interesting thoughts! What's something that makes you laugh? 😄",
      "You're awesome! 🌈 I'm learning so much from our conversation! What's your favorite thing to do for fun? 🎨"
    ];

    return encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    console.log('User sent message:', inputMessage);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateKidSafeResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      console.log('Bot responded with:', botResponse.text);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-kid-turquoise to-kid-coral text-white p-6">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
            <span className="animate-bounce-gentle">🤖</span>
            Chat with Robo!
            <span className="animate-bounce-gentle">💬</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-kid-coral text-white'
                        : 'bg-kid-turquoise/20 text-gray-800'
                    } shadow-lg`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🤖</span>
                        <span className="font-bold text-kid-turquoise">Robo</span>
                      </div>
                    )}
                    <p className="text-lg leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-kid-turquoise/20 text-gray-800 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🤖</span>
                      <span className="font-bold text-kid-turquoise">Robo</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-kid-turquoise rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-kid-turquoise rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-kid-turquoise rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... 😊"
                className="flex-1 rounded-2xl border-2 border-kid-turquoise/30 focus:border-kid-turquoise text-lg p-4"
                maxLength={200}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-kid-coral hover:bg-kid-coral/80 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Send 🚀
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Remember: Be kind, have fun, and always tell a grown-up if something doesn't feel right! 😊
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}