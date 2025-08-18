import React, { useState } from 'react';
import { ArrowRight, Bot, Video, Mic, BarChart3, FileText, MessageSquare, Upload, Download, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '../components/Button';
import Chatbot from '../components/Chatbot';
import axios from 'axios';
import { config } from '../config';

export function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RAG Agent Demo State
  const [ragQuery, setRagQuery] = useState('');
  const [ragResponse, setRagResponse] = useState('');
  const [ragLoading, setRagLoading] = useState(false);

  // Text-to-Video Demo State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);

  // AI Voice Demo State
  const [voiceText, setVoiceText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using a simple fetch to send email via Resend API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRagDemo = async () => {
    if (!ragQuery.trim()) return;
    setRagLoading(true);
    
    try {
      // Simulate RAG API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRagResponse(`Based on the documents, here's what I found about "${ragQuery}": This is a simulated response showing how our RAG system would analyze your documents and provide intelligent answers with context and citations.`);
    } catch (error) {
      setRagResponse('Error processing your query. Please try again.');
    } finally {
      setRagLoading(false);
    }
  };

  const handleVideoDemo = async () => {
    if (!videoPrompt.trim()) return;
    setVideoLoading(true);
    
    try {
      // Simulate video generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setVideoUrl('https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4');
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  const handleVoiceDemo = async () => {
    if (!voiceText.trim()) return;
    setVoiceLoading(true);
    
    try {
      // Simulate voice generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAudioUrl('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
    } catch (error) {
      console.error('Error generating voice:', error);
    } finally {
      setVoiceLoading(false);
    }
  };

  const toggleAudio = () => {
    const audio = document.getElementById('demo-audio') as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'pulse 8s infinite'
          }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center space-y-8">
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
                Advanced AI
                <span className="block">Solutions for</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Your Business</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Experience the power of AI with our comprehensive suite of tools. From intelligent document analysis to dynamic video generation and natural voice synthesis.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 group"
                >
                  Explore AI Tools
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-800/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI Solutions in Action</h2>
            <p className="text-xl text-gray-300">Try our AI tools with live demonstrations</p>
          </div>

          <div className="space-y-24">
            {/* RAG Agent Demo */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      <Bot className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">RAG Agent</h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    Intelligent document analysis powered by Retrieval-Augmented Generation. Upload your documents and get instant, contextual answers.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ragQuery}
                        onChange={(e) => setRagQuery(e.target.value)}
                        placeholder="Ask about your documents..."
                        className="flex-1 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button onClick={handleRagDemo} disabled={ragLoading}>
                        {ragLoading ? 'Processing...' : 'Ask'}
                      </Button>
                    </div>
                    {ragResponse && (
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                        <p className="text-gray-300">{ragResponse}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=600"
                    alt="RAG Agent"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Text-to-Video Demo */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative">
                  <img
                    src="https://images.unsplash.com/photo-1626908013351-800ddd734b8a?auto=format&fit=crop&q=80&w=600"
                    alt="Text to Video"
                    className="rounded-xl shadow-2xl"
                  />
                  {videoUrl && (
                    <div className="mt-4">
                      <video
                        controls
                        className="w-full rounded-lg"
                        src={videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                      <Video className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Text-to-Video</h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    Transform your text descriptions into engaging video content automatically. Perfect for marketing, education, and content creation.
                  </p>
                  <div className="space-y-4">
                    <textarea
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      placeholder="Describe the video you want to create..."
                      rows={4}
                      className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Button onClick={handleVideoDemo} disabled={videoLoading}>
                      {videoLoading ? 'Generating...' : 'Generate Video'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Voice Demo */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                      <Mic className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">AI Voice Synthesis</h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    Convert text to natural-sounding speech in multiple languages and voices. Perfect for audiobooks, presentations, and accessibility.
                  </p>
                  <div className="space-y-4">
                    <textarea
                      value={voiceText}
                      onChange={(e) => setVoiceText(e.target.value)}
                      placeholder="Enter text to convert to speech..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleVoiceDemo} disabled={voiceLoading}>
                        {voiceLoading ? 'Generating...' : 'Generate Voice'}
                      </Button>
                      {audioUrl && (
                        <Button variant="outline" onClick={toggleAudio}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                      )}
                    </div>
                    {audioUrl && (
                      <audio
                        id="demo-audio"
                        src={audioUrl}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600"
                    alt="AI Voice"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis Demo */}
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
                    alt="Sentiment Analysis"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-500/20 p-3 rounded-lg mr-4">
                      <BarChart3 className="h-8 w-8 text-orange-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Sentiment Analysis</h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    Analyze customer feedback, social media posts, and reviews to understand sentiment and emotional tone at scale.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">85%</div>
                      <div className="text-sm text-gray-300">Positive</div>
                    </div>
                    <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400">10%</div>
                      <div className="text-sm text-gray-300">Neutral</div>
                    </div>
                    <div className="bg-red-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-400">5%</div>
                      <div className="text-sm text-gray-300">Negative</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About NovaNexus</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're Ravi and Tirth—passionate IT professionals dedicated to making AI accessible and practical for New Zealand businesses and individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Mission</h3>
              <p className="text-gray-400">
                To make AI simple, approachable, and useful for everyone in New Zealand, empowering local businesses to thrive.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Vision</h3>
              <p className="text-gray-400">
                A New Zealand where every Kiwi feels confident using AI to improve their daily life and business operations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Commitment</h3>
              <p className="text-gray-400">
                Personal support, practical solutions, and community-first approach to AI implementation and education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started Today</h2>
            <p className="text-xl text-gray-300">
              Ready to transform your business with AI? Let's discuss how we can help.
            </p>
          </div>

          <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                <p className="text-gray-300">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}