import { useState, useEffect, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Video, Mic, Radio, BarChart3, Map, Play, Hourglass } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/Dialog";
import { Button } from '../components/Button';
import { config } from '../config';
import Chatbot from '../components/Chatbot';

export function Services() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('rag');
  const [previewVoice, setPreviewVoice] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  const tabs = [
    { id: 'rag', label: 'RAG Agent', icon: FileText },
    { id: 'text-to-video', label: 'Text-to-Video', icon: Video },
    { id: 'voice', label: 'AI Voice Agent', icon: Mic },
    { id: 'anchor', label: 'AI Anchor', icon: Radio },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: BarChart3 },
    { id: 'routes', label: 'Open Home Routes', icon: Map },
    { id: 'upcoming', label: 'Coming Soon', icon: Hourglass }
  ];

  const voiceOptions = [
    { id: 'professional-male', name: 'Professional Male', preview: 'https://example.com/voice1.mp3' },
    { id: 'professional-female', name: 'Professional Female', preview: 'https://example.com/voice2.mp3' },
    { id: 'friendly-male', name: 'Friendly Male', preview: 'https://example.com/voice3.mp3' },
    { id: 'friendly-female', name: 'Friendly Female', preview: 'https://example.com/voice4.mp3' },
    { id: 'executive', name: 'Executive', preview: 'https://example.com/voice5.mp3' },
    { id: 'sales', name: 'Sales Specialist', preview: 'https://example.com/voice6.mp3' }
  ];

  const handlePreviewVoice = (voiceId: string) => {
    setPreviewVoice(voiceId);
    // In a real implementation, this would play the voice sample
    console.log('Playing preview for voice:', voiceId);
  };


  const handlePlayPause = (index: number) => {
    const audio = document.getElementById(`audio-${index}`) as HTMLAudioElement;

    // Stop all other audio elements
    document.querySelectorAll('audio').forEach(element => {
      if (element.id !== `audio-${index}`) {
        element.pause();
      }
    });

    // Toggle play/pause for the clicked audio
    if (audio.paused) {
      audio.play();
      setPlayingIndex(index);
    } else {
      audio.pause();
      setPlayingIndex(null);
    }
  };


  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Your AI Playground</h1>
          <h3 className="text-xl font-bold text-foreground mb-4">Try It. Tweak It. Make It Yours.</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our AI can do.
            Explore live examples, play with ready-made workflows, and discover ideas you didn’t know you needed.
            If it sparks something, we’ll help you build your own version.
          </p>
        </div>

        <div className="flex overflow-x-auto border-b border-primary-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-primary-600 hover:border-b-2 hover:border-primary-200'
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RAG Agent */}
          {activeTab === 'rag' && (
            <>
              {/* Left Panel - Examples */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">📑 Document Processing Examples</h2>
                {[
                  {
                    title: 'Legal Document Analysis',
                    description: 'Intelligent contract review and legal document processing.',
                    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
                    examples: ['Contract Review', 'Compliance Check', 'Case Analysis'],
                    docUrl: `${config.baseUri.ragBucket}/policy_guidelines.pdf`
                  },
                  {
                    title: 'E-commerce Reports',
                    description: 'Automated analysis of financial documents and reports.',
                    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
                    examples: ['Earnings Reports', 'Risk Assessment', 'Market Analysis'],
                    docUrl: `${config.baseUri.ragBucket}/mcd_nutritions.pdf`
                  },
                  {
                    title: 'Technical Documentation',
                    description: 'Process and analyze technical documents and manuals.',
                    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=400',
                    examples: ['API Documentation', 'User Manuals', 'Technical Specs'],
                    docUrl: `${config.baseUri.ragBucket}/medical_book.pdf`
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors">
                    <div className="relative h-48">
                      <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="absolute top-4 right-4 space-y-2">
                          <Button
                            className="relative px-4 py-2 rounded-lg shadow-md text-primary-700 bg-white transition-all hover:bg-gradient-to-r from-white via-primary-100 to-white"
                            onClick={() => setPreviewDoc(category.docUrl)}
                          >
                            Preview
                          </Button>

                          <Button
                            className="relative px-4 py-2 rounded-lg shadow-md text-white bg-primary-600 transition-all hover:bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600"
                            onClick={() => setIsChatbotOpen(true)}
                          >
                            Try Now
                          </Button>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                          <p className="text-white/80 text-sm">{category.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-primary-50">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.examples.map((example, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">{example}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Document Upload */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">🔍 Document Analysis</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Context Alias
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter a name for this context (e.g., 'Legal Contracts 2024')"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed border-primary-200 rounded-lg p-8 text-center hover:border-primary-300 transition-colors">
                      <div className="space-y-2">
                        <FileText className="h-8 w-8 mx-auto text-primary-500" />
                        <p className="text-gray-600">Drag and drop your files here, or click to browse</p>
                        <p className="text-sm text-gray-500">Supports PDF, DOCX, TXT (up to 50MB)</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Analysis Type
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>General Analysis</option>
                        <option>Legal Review</option>
                        <option>Financial Analysis</option>
                        <option>Technical Review</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Analysis Parameters
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Key Points Extraction</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Entity Recognition</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Summary Generation</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Sentiment Analysis</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Analyze Documents
                  </button>
                </div>
              </div>

              {/* Document Preview Modal */}
              {previewDoc && (
                <Dialog open={!!previewDoc} onOpenChange={(open) => {
                  if (!open) setPreviewDoc(null);
                }}>
                  <DialogContent className="w-full max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>📄 Explore the Document</DialogTitle>
                      <DialogDescription>View the full content below and click 'Try Now' to ask any questions in the chatbot! 🤖💬</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <iframe src={previewDoc} className="w-full h-[500px]" title="Document Preview" />
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {/* Chatbot Widget */}
              {isChatbotOpen && (
                <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
              )}
            </>
          )}

          {/* Text-to-Video */}
          {activeTab === 'text-to-video' && (
            <>
              {/* Left Panel - Examples */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">🎥 Text-to-Video Examples</h2>
                {[
                  {
                    title: 'Event Showcase',
                    description: 'Capture the vibrant energy of a Holi celebration in Auckland, highlighting the joyful colors, music, and dance. Showcase the cultural fusion of Indian traditions with a global audience, featuring the Mumbai Local food stall serving authentic street food. Use dynamic camera shots, slow-motion color bursts, and upbeat festival music to create an immersive experience.',
                    video: `${config.baseUri.textToVideoBucket}/mumbailocal.mp4`,
                    thumbnail: `${config.baseUri.textToVideoBucket}/mumbailocal_thumbnail.png`,
                    examples: ['Tourism', 'Public awareness', 'Government campaigns', 'Event promotions']
                  },
                  {
                    title: 'Brand Marketing',
                    description: `Produce an electrifying promotional video showcasing 1ShotBuilders' cutting-edge solutions. Use high-energy transitions, sharp typography, and animated graphics to highlight brand expertise, testimonials, and real-world success stories. Finish with a compelling call-to-action to boost engagement.`,
                    video: `${config.baseUri.textToVideoBucket}/1shotBuilders.mp4`,
                    thumbnail: `${config.baseUri.textToVideoBucket}/1shotbuilders_thumbnail.png`,
                    examples: ['Product launches', 'Investor pitches', 'Trade shows', 'E-commerce']
                  },
                  {
                    title: 'Interactive Content',
                    description: 'Bring the prehistoric era to life with an animated scene featuring dinosaurs in action. Use vibrant colors, engaging movements, and realistic sounds to create an entertaining yet educational experience. Suitable for kids, gaming content, or themed attraction promos.',
                    video: `${config.baseUri.textToVideoBucket}/dinosaurs.mp4`,
                    thumbnail: `${config.baseUri.textToVideoBucket}/dinosaur_thumbnail.png`,
                    examples: ['Kids` education', 'How-to Guides', 'VR/AR experiences', 'Trailers & Teasers']
                  },
                  {
                    title: 'Educational Content',
                    description: 'Create a visually immersive medical animation highlighting the Palmaris Longus muscle, a little-known forearm structure. Use a mix of 3D anatomical models, overlays, and real-world comparisons to explain its presence, function, and clinical significance. End with applications in surgical tendon grafting and self-diagnosis techniques.',
                    video: `${config.baseUri.textToVideoBucket}/medical.mp4`,
                    thumbnail: `${config.baseUri.textToVideoBucket}/medical_thumbnail.png`,
                    examples: ['Course Modules', 'Medical training', 'Concept Explainers', 'Fitness science', 'Awareness Campaigns']
                  },
                  {
                    title: 'Personal Branding',
                    description: 'Craft an engaging podcast visual for an influencer discussing deep and meaningful conversations. Use smooth text animations, dynamic audio waveforms, and a cinematic color palette to enhance storytelling. Perfect for thought leaders, personal branding, and social media engagement.',
                    video: `${config.baseUri.textToVideoBucket}/behkibatein.mp4`,
                    thumbnail: `${config.baseUri.textToVideoBucket}/behkibatein_thumbnail.png`,
                    examples: ['Podcast', 'Storytelling', 'Customer Stories', 'Lyric videos']
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors flex flex-col md:flex-row">
                    {/* Left side - Description */}
                    <div className="p-6 flex flex-col justify-between md:w-2/3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                        <p className="text-gray-600 mb-4 relative pl-8 pr-8">
                          <span className="absolute left-0 top-0 text-3xl font-bold text-orange-400">“</span>
                          {category.description}
                          <span className="absolute right-0 bottom-0 text-3xl font-bold text-orange-400">”</span>
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.examples.map((example, i) => (
                            <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Video */}
                    <div className="md:w-1/3 relative flex justify-center items-center p-4">
                      <div className="aspect-[9/16] w-full max-w-xs relative">
                        <video
                          src={category.video}
                          className="w-full h-full object-cover rounded-lg"
                          controls
                          preload="metadata"
                          poster={category.thumbnail}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Playground */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">Text-to-Video Generator</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🛡️ Access Token
                    </label>
                    <input
                      type="password"
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your Access token"
                    />
                    <p className="mt-1 text-sm text-gray-500">🎥 Want to generate videos? This feature isn't publicly available to prevent misuse, but just reach out to me, and I’ll hook you up with access! 🔑😊</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🤔 What's on your mind? 💭
                    </label>
                    <textarea
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={6}
                      placeholder="Enter your video script or description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Style
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Professional</option>
                        <option>Cinematic</option>
                        <option>Casual</option>
                        <option>Educational</option>
                        <option>Social Media</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>5 minutes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visual Preferences
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Include Text Overlays</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Background Music</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Transitions</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Custom Branding</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Generate Video
                  </button>
                </div>
              </div>
            </>
          )}

          {/* AI Voice Agent */}
          {activeTab === 'voice' && (
            <>
              {/* Left Panel - Examples */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">📢Text-to-Voice Examples</h2>
                {[
                  {
                    title: 'Inbound Call Handling',
                    description: 'AI-powered customer service and support.',
                    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400',
                    examples: ['Support Inquiries', 'Appointment Scheduling', 'Product Information'],
                    audio: `${config.baseUri.aiVoiceBucket}/inbound.mp3`
                  },
                  {
                    title: 'Multilingual Support',
                    description: 'Global customer service in multiple languages.',
                    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400',
                    examples: ['Language Detection', 'Real-time Translation', 'Cultural Adaptation'],
                    audio: `${config.baseUri.aiVoiceBucket}/multilingual.mp3`
                  },
                  {
                    title: 'Sound Effects',
                    description: 'Generate sound effects for your use case',
                    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400',
                    examples: ['Background Music', 'Relaxation Sounds', 'Generative Music'],
                    audio: `${config.baseUri.aiVoiceBucket}/jungle_sound.mp3`
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors">
                    <div className="relative h-48">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Dark gradient overlay for better text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                          <p className="text-white/80 text-sm">{category.description}</p>
                        </div>
                      </div>

                      {/* Centered Transparent Audio Player Overlay with Orange Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => handlePlayPause(index)}
                          className="p-4 bg-black/30 hover:bg-black/50 rounded-full transition duration-300"
                        >
                          {playingIndex === index ? (
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          ) : (
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>
                        <audio id={`audio-${index}`} className="hidden">
                          <source src={category.audio} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>


                      </div>
                    </div>

                    <div className="p-4 bg-primary-50">
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Voice Generator */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">🔊 AI Call Agent Setup</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Script
                    </label>
                    <textarea
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={6}
                      placeholder="Enter the initial greeting and conversation flow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Selection
                    </label>
                    <div className="space-y-4">
                      {voiceOptions.map((voice) => (
                        <div key={voice.id} className="flex items-center justify-between p-3 border border-primary-100 rounded-lg hover:border-primary-300 transition-colors">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="voice"
                              value={voice.id}
                              className="text-primary-600 focus:ring-primary-500"
                            />
                            <label className="text-sm font-medium text-gray-700">{voice.name}</label>
                          </div>
                          <Button
                            onClick={() => handlePreviewVoice(voice.id)}
                            className="flex items-center space-x-1 text-sm"
                            variant="outline"
                            size="sm"
                          >
                            <Play className="h-4 w-4" />
                            <span>Preview</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Call Type
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Inbound Support</option>
                        <option>Outbound Sales</option>
                        <option>Appointment Scheduling</option>
                        <option>Survey/Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call Features
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Sentiment Analysis</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Call Recording</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Live Transcription</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Human Handoff</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Create Voice Agent
                  </button>
                </div>
              </div>
            </>
          )}

          {/* AI Anchor */}
          {activeTab === 'anchor' && (
            <>
              {/* Left Panel - Examples */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">🤖 AI Anchor Examples</h2>
                <h4 className="text font-bold mb-6">These are purely created by AI.</h4>
                {/* News Broadcasting - Portrait Video */}
                {[{
                  title: 'News Broadcasting',
                  description: 'Taranaki Maunga becomes a legal person as treaty settlement passes into law.',
                  video: `${config.baseUri.textToVideoBucket}/anchor.mp4`,
                  thumbnail: `${config.baseUri.textToVideoBucket}/anchor_thumbnail.png`,
                  thumbnailLarge: `${config.baseUri.textToVideoBucket}/anchor_thumbnail.png`, // Added large thumbnail
                  videoAspect: '9/16',
                  examples: ['Breaking News', 'Weather Reports', 'Sports Updates', 'Viral Clips', 'Brand Yourself']
                }].map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors flex flex-col md:flex-row"
                  >
                    {/* Left side - Description */}
                    <div className="p-6 flex flex-col justify-between md:w-2/3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                        <p className="text-gray-600 mb-4 relative pl-8 pr-8">
                          <span className="absolute left-0 top-0 text-3xl font-bold text-orange-400">"</span>
                          {category.description}
                          <span className="absolute right-0 bottom-0 text-3xl font-bold text-orange-400">"</span>
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.examples.map((example, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Video */}
                    <div className="md:w-1/3 relative flex justify-center items-center p-4">
                      <div
                        className={`aspect-[${category.videoAspect}] w-full max-w-xs relative`}
                      >
                        <video
                          src={category.video}
                          className="w-full h-full object-cover rounded-lg"
                          controls
                          preload="metadata"
                          poster={category.thumbnailLarge} // Use large thumbnail as poster
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Corporate Communications - Landscape Video */}
                {[{
                  title: 'Marketing and Communications',
                  description: 'Small switch, big eco win — these KiwiGreen bags crushed my avocado test and ditched the plastic!',
                  video: `${config.baseUri.textToVideoBucket}/market.mp4`,
                  thumbnail: `${config.baseUri.textToVideoBucket}/market_thumbnail.png`,
                  thumbnailLarge: `${config.baseUri.textToVideoBucket}/market_thumbnail.png`, // Added large thumbnail
                  videoAspect: '16/9',
                  examples: ['Business Reports', 'Company Updates', 'User-Generated Content ads']
                }].map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
                  >
                    {/* Landscape Video */}
                    <div className="w-full aspect-[16/9]">
                      <video
                        src={category.video}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster={category.thumbnailLarge} // Use large thumbnail as poster
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    {/* Description Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                      <p className="text-gray-600 mb-4 relative pl-8 pr-8">
                          <span className="absolute left-0 top-0 text-3xl font-bold text-orange-400">"</span>
                          {category.description}
                          <span className="absolute right-0 bottom-0 text-3xl font-bold text-orange-400">"</span>
                        </p>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Anchor Creator */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">🗣️ AI Anchor Creator</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Script
                    </label>
                    <textarea
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={6}
                      placeholder="Enter the script for the AI anchor to present"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Anchor Style
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>News Anchor</option>
                        <option>Corporate Presenter</option>
                        <option>Educational Instructor</option>
                        <option>Casual Host</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>News Studio</option>
                        <option>Corporate Office</option>
                        <option>Virtual Set</option>
                        <option>Custom Upload</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presentation Features
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Graphics Overlay</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Lower Thirds</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>B-Roll Integration</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Custom Branding</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Create Presentation
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Sentiment Analysis */}
          {activeTab === 'sentiment' && (
            <>
              {/* Left Panel - Examples */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Analysis Examples</h2>
                {[
                  {
                    title: 'Social Media Impact',
                    description: 'Comprehensive analysis of social media engagement.',
                    examples: ['Brand Perception', 'Campaign Performance', 'Audience Sentiment']
                  },
                  {
                    title: 'Customer Experience',
                    description: 'Deep dive into customer feedback and interactions.',
                    examples: ['Support Quality', 'Product Satisfaction', 'Service Rating']
                  },
                  {
                    title: 'Market Intelligence',
                    description: 'Competitive analysis and market sentiment tracking.',
                    examples: ['Industry Trends', 'Competitor Analysis', 'Market Position']
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-primary-100 hover:border-primary-200 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Demo Analysis */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">Sentiment Analysis Report</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-2">Sample Social Media Post:</p>
                    <p className="font-medium">
                      "Just tried the new AI feature update - absolutely love how intuitive it is! The response time is incredible, though it took me a moment to get used to the new interface. A bit frustrated with the pricing change, but the value is definitely there. Can't wait to see what's next! 🚀 #TechInnovation #UserExperience"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Emotional Breakdown</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Joy</span>
                            <span>45%</span>
                          </div>
                          <div className="w-full bg-purple-100 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Excitement</span>
                            <span>30%</span>
                          </div>
                          <div className="w-full bg-blue-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Frustration</span>
                            <span>15%</span>
                          </div>
                          <div className="w-full bg-red-100 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Anticipation</span>
                            <span>10%</span>
                          </div>
                          <div className="w-full bg-green-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Sentiment Overview</h3>
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-green-700">Positive</span>
                            <span className="text-green-700">75%</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-red-700">Negative</span>
                            <span className="text-red-700">15%</span>
                          </div>
                          <div className="w-full bg-red-200 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">Neutral</span>
                            <span className="text-gray-700">10%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Phrases & Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">AI feature (+)</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">intuitive (+)</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">response time (+)</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">pricing change (-)</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">new interface (n)</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">#TechInnovation</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Open Home Routes */}
          {activeTab === 'routes' && (
            <>
              {/* Left Panel - Examples */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Route Examples</h2>
                {[
                  {
                    title: 'City Tours',
                    description: 'Optimized routes for city-wide property viewings.',
                    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=400',
                    examples: ['Downtown Loop', 'Suburban Circuit', 'Luxury Properties']
                  },
                  {
                    title: 'Time-Based Routes',
                    description: 'Efficient scheduling for multiple property viewings.',
                    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
                    examples: ['Morning Tours', 'Afternoon Circuit', 'Weekend Special']
                  },
                  {
                    title: 'Property Type Routes',
                    description: 'Specialized routes based on property categories.',
                    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=400',
                    examples: ['New Listings', 'Luxury Homes', 'Investment Properties']
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors">
                    <div className="relative h-48">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                          <p className="text-white/80 text-sm">{category.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-primary-50">
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Route Planner */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">Route Planner</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Location
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your starting address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Locations
                    </label>
                    <textarea
                      className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={4}
                      placeholder="Enter property addresses (one per line)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Route Type
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Shortest Distance</option>
                        <option>Fastest Time</option>
                        <option>Property Value</option>
                        <option>Custom Priority</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transportation
                      </label>
                      <select className="w-full rounded-md border border-primary-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Driving</option>
                        <option>Walking</option>
                        <option>Cycling</option>
                        <option>Public Transit</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Route Options
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Avoid Highways</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Avoid Tolls</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Include Traffic</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
                        <span>Return to Start</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Generate Route
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Upcoming Work */}
          {activeTab === 'upcoming' && (
            <>
              {/* Left Panel - Features in Development */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">🚀 Upcoming Features</h2>
                {[
                  {
                    title: 'AI Lead Generator',
                    description: 'Automated lead generation powered by AI for businesses.',
                    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=400',
                    examples: ['B2B Outreach', 'Sales Funnel Optimization', 'Targeted Lead Discovery']
                  },
                  {
                    title: 'AI Job Applications',
                    description: 'AI-driven job search that finds openings and applies for you.',
                    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
                    examples: ['Resume Parsing', 'Job Match Optimization', 'Auto-Apply to Openings']
                  },
                  {
                    title: 'AI Cost Optimization',
                    description: 'Reducing costs and improving efficiency for AI-powered workflows.',
                    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=400',
                    examples: ['Cloud Cost Reduction', 'AI Workflow Optimization', 'Resource Scaling']
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-primary-100 overflow-hidden hover:border-primary-300 transition-colors">
                    <div className="relative h-48">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                          <p className="text-white/80 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-primary-50">
                      <div className="flex flex-wrap gap-2">
                        {feature.examples.map((example, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Stay Updated */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-primary-100">
                <h2 className="text-2xl font-bold mb-6">🔜 Stay Tuned!</h2>
                <p className="text-gray-600 mb-4">We’re actively working on these features to bring you the best AI-powered tools. Stay updated and let us know what excites you the most! 🎯</p>
                <button className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors">
                  🔔 Get Notified
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}