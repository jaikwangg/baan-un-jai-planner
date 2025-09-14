import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAIResponse } from '@/services/chatService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' as const };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const botResponse = await getAIResponse(input);
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        setMessages((prevMessages) => [...prevMessages, { text: 'An error occurred. Please try again.', sender: 'bot' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Finance Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto p-4 border rounded-md mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="p-2 rounded-lg bg-gray-200">...</div></div>}
          </div>
          <div className="flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="Ask about finance..."
              className="mr-2"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
