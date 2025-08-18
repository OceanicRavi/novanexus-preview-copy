import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  //const [isOpen, setIsOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling

  // Fetch properties from Supabase when chatbot opens
  useEffect(() => {
    if (isOpen) {
      let storedSessionId = localStorage.getItem("session_id");
      if (!storedSessionId) {
        storedSessionId = uuidv4(); // Generate a new session ID
        localStorage.setItem("session_id", storedSessionId);
      }
      setSessionId(storedSessionId);
    }
  }, [isOpen]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message; // Keep original message for UI display
    setMessage('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]); // Show original message in UI
    setIsLoading(true);

    // Modify message only for webhook request
    let webhookMessage = userMessage;

    try {
      const response = await axios.post(
        'https://novanexus.app.n8n.cloud/webhook/a184926a-bd5f-4af4-a9bc-7ac91d7e2379',
        {
          session_id: sessionId,
          message: webhookMessage, // Send the modified message only to webhook
          selectedProperties: selectedProperties.length > 0 ? selectedProperties : null,
        }
      );

      setMessages(prev => [...prev, { text: response.data.output || 'No response from server', isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col border border-gray-700">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with Us</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 border-b border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Ask me from the example documents!</h4>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${msg.isUser ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-700/50 text-gray-300'
                    }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700/50 text-gray-300 rounded-lg p-3">Typing...</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
