import React, { useState } from 'react';
import { ArrowRight, Bot, Video, Mic, BarChart3, MessageSquare, FileText, Zap, Mail, Phone, MapPin, CheckCircle, Radio, Map, Hourglass } from 'lucide-react';
import { Button } from '../components/Button';
import { config } from '../config';

export function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const services = [
    {
      id: 'rag',
      title: 'RAG Agent',
      description: 'Intelligent document analysis and question answering',
      icon: <Bot className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      examples: [
        {
          title: 'Document Q&A',
          description: 'Upload PDFs, Word docs, or text files and ask questions about their content.',
          example: 'Q: "What are the key findings in this research paper?"\nA: "The research identifies three main findings: 1) AI adoption increased by 40% in 2023, 2) Companies using AI saw 25% productivity gains, 3) The main barrier is lack of technical expertise."'
        },
        {
          title: 'Contract Analysis',
          description: 'Analyze legal documents and extract key information.',
          example: 'Q: "What are the termination clauses in this contract?"\nA: "The contract includes two termination clauses: 1) Either party may terminate with 30 days written notice, 2) Immediate termination is allowed for material breach of contract terms."'
        },
        {
          title: 'Research Assistant',
          description: 'Get insights from multiple documents simultaneously.',
          example: 'Q: "Compare the methodologies across these three studies"\nA: "Study A used quantitative surveys (n=500), Study B employed qualitative interviews (n=25), while Study C combined both approaches with mixed-methods design."'
        }
      ]
    },
    {
      id: 'text-to-video',
      title: 'Text-to-Video',
      description: 'Transform text into engaging video content',
      icon: <Video className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      examples: [
        {
          title: 'Marketing Videos',
          description: 'Create promotional videos from product descriptions.',
          example: 'Input: "Introducing our new eco-friendly water bottle made from recycled materials"\nOutput: 30-second video with product showcase, environmental benefits, and call-to-action',
          videoUrl: 'https://example-bucket.r2.dev/marketing-video-sample.mp4'
        },
        {
          title: 'Educational Content',
          description: 'Turn educational text into visual learning materials.',
          example: 'Input: "The water cycle consists of evaporation, condensation, and precipitation"\nOutput: Animated video showing water cycle stages with narration and visual effects',
          videoUrl: 'https://example-bucket.r2.dev/educational-video-sample.mp4'
        },
        {
          title: 'Social Media Content',
          description: 'Generate engaging social media videos from posts.',
          example: 'Input: "5 tips for better productivity: 1) Plan your day 2) Take breaks 3) Eliminate distractions"\nOutput: Dynamic video with animated text, icons, and background music',
          videoUrl: 'https://example-bucket.r2.dev/social-media-video-sample.mp4'
        }
      ]
    },
    {
      id: 'voice',
      title: 'AI Voice',
      description: 'Natural voice synthesis and audio generation',
      icon: <Mic className="h-8 w-8" />,
      color: 'from-green-500 to-teal-500',
      examples: [
        {
          title: 'Podcast Generation',
          description: 'Convert articles into natural-sounding podcast episodes.',
          example: 'Input: Blog post about AI trends\nOutput: 10-minute podcast episode with natural voice, proper pacing, and emphasis on key points',
          audioUrl: 'https://example-bucket.r2.dev/podcast-sample.mp3'
        },
        {
          title: 'Multilingual Narration',
          description: 'Generate voiceovers in multiple languages and accents.',
          example: 'Input: "Welcome to our company presentation"\nOutput: Professional narration available in English, Spanish, French, German, and more',
          audioUrl: 'https://example-bucket.r2.dev/multilingual-sample.mp3'
        },
        {
          title: 'Audiobook Creation',
          description: 'Transform written content into engaging audiobooks.',
          example: 'Input: Chapter from business book\nOutput: Professional audiobook narration with chapter breaks and consistent voice quality',
          audioUrl: 'https://example-bucket.r2.dev/audiobook-sample.mp3'
        }
      ]
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Analyze emotions and opinions in text data',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'from-orange-500 to-red-500',
      examples: [
        {
          title: 'Customer Feedback Analysis',
          description: 'Analyze customer reviews and feedback for insights.',
          example: 'Input: "The product is amazing but shipping was slow"\nOutput: Overall: Mixed (60% Positive, 40% Negative)\nProduct: Positive (95%)\nShipping: Negative (80%)'
        },
        {
          title: 'Social Media Monitoring',
          description: 'Track brand sentiment across social platforms.',
          example: 'Input: 1000 tweets about your brand\nOutput: 65% Positive, 25% Neutral, 10% Negative\nKey themes: Great customer service (+), High prices (-)'
        },
        {
          title: 'Survey Analysis',
          description: 'Extract insights from open-ended survey responses.',
          example: 'Input: Employee satisfaction survey responses\nOutput: 78% positive sentiment, main concerns: work-life balance, career growth opportunities'
        }
      ]
    },
    {
      id: 'chatbot',
      title: 'Custom Chatbots',
      description: 'Intelligent conversational AI for your business',
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'from-indigo-500 to-purple-500',
      examples: [
        {
          title: 'Customer Support Bot',
          description: 'Handle common customer inquiries 24/7.',
          example: 'Customer: "How do I reset my password?"\nBot: "I can help you reset your password. Please click the \'Forgot Password\' link on the login page and enter your email address. You\'ll receive reset instructions within 5 minutes."'
        },
        {
          title: 'Sales Assistant',
          description: 'Qualify leads and provide product information.',
          example: 'Visitor: "What pricing plans do you offer?"\nBot: "We have three plans: Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing). Which features are most important to you?"'
        },
        {
          title: 'FAQ Bot',
          description: 'Instantly answer frequently asked questions.',
          example: 'User: "What are your business hours?"\nBot: "We\'re open Monday-Friday 9 AM to 6 PM EST. For urgent matters outside business hours, please email support@company.com"'
        }
      ]
    },
    {
      id: 'content',
      title: 'Content Generation',
      description: 'AI-powered content creation and optimization',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      examples: [
        {
          title: 'Blog Post Writing',
          description: 'Generate SEO-optimized blog posts on any topic.',
          example: 'Topic: "Benefits of Remote Work"\nOutput: 1500-word article with introduction, 5 main benefits, statistics, examples, and conclusion with proper SEO optimization'
        },
        {
          title: 'Product Descriptions',
          description: 'Create compelling product descriptions that convert.',
          example: 'Product: Wireless Headphones\nOutput: "Experience crystal-clear audio with our premium wireless headphones. Featuring 30-hour battery life, noise cancellation, and comfortable over-ear design perfect for work or travel."'
        },
        {
          title: 'Email Campaigns',
          description: 'Craft engaging email marketing campaigns.',
          example: 'Campaign: Product Launch\nOutput: Subject line, personalized greeting, product benefits, social proof, clear CTA, and follow-up sequence'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Workflow Automation',
      description: 'Streamline business processes with AI',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-cyan-500 to-blue-500',
      examples: [
        {
          title: 'Email Processing',
          description: 'Automatically categorize and respond to emails.',
          example: 'Incoming email: Customer complaint\nAutomation: Categorizes as "Support - High Priority", creates ticket, sends acknowledgment, routes to appropriate team member'
        },
        {
          title: 'Data Entry Automation',
          description: 'Extract and input data from documents automatically.',
          example: 'Input: Invoice PDF\nAutomation: Extracts vendor name, amount, date, line items, and automatically enters into accounting system'
        },
        {
          title: 'Lead Qualification',
          description: 'Automatically score and route leads based on criteria.',
          example: 'New lead: Company size 500+, budget $50k+, timeline immediate\nAutomation: Scores as "Hot Lead", assigns to senior sales rep, schedules follow-up call'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img src="/novanexus_logo.png" className="h-8 w-8 animate-pulse" alt="Nova Nexus Logo" />
                  <div className="absolute inset-0 h-8 w-8 mix-blend-multiply animate-pulse delay-150">
                    <img src="/novanexus_logo.png" className="h-8 w-8" alt="Nova Nexus Logo" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  NovaNexus
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white hover:text-gray-300 font-medium">Services</a>
              <a href="#about" className="text-white hover:text-gray-300 font-medium">About</a>
              <a href="#contact" className="text-white hover:text-gray-300 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'pulse 8s infinite'
          }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        </div>

        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-8">
                Advanced AI
                <span className="block">Infrastructure for</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Your Business</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                Transform your operations with our comprehensive AI solutions. From intelligent document analysis to automated workflows, we help businesses leverage cutting-edge AI technology to drive growth and innovation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 group">
                  <a href="#services" className="flex items-center">
                    Explore Services
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hover:text-gray-100">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Examples */}
      <section id="services" className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI Solutions & Examples</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               Discover our comprehensive AI solutions with real examples and live demonstrations.
             </p>
          </div>

          {/* RAG Agent Examples */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Bot className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-3xl font-bold text-white">📑 RAG Agent - Document Processing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div key={index} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-colors">
                  <div className="relative h-48">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{category.title}</h4>
                        <p className="text-white/80 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text-to-Video Examples */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Video className="h-8 w-8 text-purple-400 mr-3" />
              <h3 className="text-3xl font-bold text-white">🎥 Text-to-Video Examples</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  examples: ['Kids education', 'How-to Guides', 'VR/AR experiences', 'Trailers & Teasers']
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
              <div key={index} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-colors">
                <div className="p-4">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300 mb-3 text-sm relative pl-6 pr-6">
                      <span className="absolute left-0 top-0 text-3xl font-bold text-orange-400">"</span>
                      {category.description}
                      <span className="absolute right-0 bottom-0 text-3xl font-bold text-orange-400">"</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {category.examples.map((example, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
                    </div>
                    <div className="aspect-video">
                      <video
                        src={category.video}
                        className="w-full h-full object-cover rounded-lg border border-gray-600"
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
          </div>

          {/* AI Voice Examples */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Mic className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-3xl font-bold text-white">📢 AI Voice Examples</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div key={index} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-green-500/50 transition-colors">
                  <div className="relative h-48">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-white mb-2">{category.title}</h4>
                        <p className="text-white/80 text-sm">{category.description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => {
                          const audio = document.getElementById(`audio-voice-${index}`) as HTMLAudioElement;
                          if (audio.paused) {
                            document.querySelectorAll('audio').forEach(el => el.pause());
                            audio.play();
                          } else {
                            audio.pause();
                          }
                        }}
                        className="p-4 bg-black/30 hover:bg-black/50 rounded-full transition duration-300"
                      >
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <audio id={`audio-voice-${index}`} className="hidden">
                        <source src={category.audio} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Anchor Examples */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <Radio className="h-8 w-8 text-orange-400 mr-3" />
              <h3 className="text-3xl font-bold text-white">🤖 AI Anchor Examples</h3>
            </div>
            <p className="text-gray-300 mb-6">These are purely created by AI.</p>
            <div className="space-y-8">
              {/* News Broadcasting - Portrait Video */}
              <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-orange-500/50 transition-colors">
                <div className="flex flex-col lg:flex-row">
                  <div className="p-6 lg:w-2/3">
                    <h4 className="text-xl font-semibold text-white mb-3">News Broadcasting</h4>
                    <p className="text-gray-300 mb-4 relative pl-8 pr-8">
                      <span className="absolute left-0 top-0 text-3xl font-bold text-orange-400">"</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <span className="absolute right-0 bottom-0 text-3xl font-bold text-orange-400">"</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Breaking News', 'Weather Reports', 'Sports Updates', 'Viral Clips', 'Brand Yourself'].map((example, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  </div>
                  <div className="lg:w-1/3 p-4 flex justify-center items-center">
                    <div className="aspect-[9/16] w-full max-w-xs">
                      <video
                        src={`${config.baseUri.textToVideoBucket}/anchor.mp4`}
                        className="w-full h-full object-cover rounded-lg border border-gray-600"
                        controls
                        preload="metadata"
                        poster={`${config.baseUri.textToVideoBucket}/anchor_thumbnail.png`}
                      >
                        Your browser does not support the video tag.
                      </video>
                <div className="relative h-40">
                  </div>
                </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Marketing Communications - Landscape Video */}
              <div className="p-4">
                    <div className="p-3">
                      <h3 className="text-base font-semibold text-white mb-1">{service.title}</h3>
                      <p className="text-white/80 text-xs">{service.description}</p>
                    <span className="absolute left-0 top-0 text-3xl font-bold text-orange-400">"</span>
                    Small switch, big eco win — these KiwiGreen bags crushed my avocado test and ditched the plastic!
                <div className="relative h-40">
                <div className="p-3 bg-gray-800/50">
                  <div className="flex flex-wrap gap-1">
                    {['Business Reports', 'Company Updates', 'User-Generated Content ads'].map((example, i) => (
                      <span key={i} className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs">
                        {example}
                      </span>
                    <div className="p-3">
                      <h3 className="text-base font-semibold text-white mb-1">{category.title}</h3>
                      <p className="text-white/80 text-xs">{category.description}</p>
                    <video
                      src={`${config.baseUri.textToVideoBucket}/market.mp4`}
                      className="w-full h-full object-cover rounded-lg border border-gray-600"
                      controls
                      preload="metadata"
                      className="p-3 bg-black/30 hover:bg-black/50 rounded-full transition duration-300"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sentiment Analysis Examples */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <BarChart3 className="h-8 w-8 text-red-400 mr-3" />
              <h3 className="text-3xl font-bold text-white">📊 Sentiment Analysis Examples</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
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
                  <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 hover:border-red-500/50 transition-colors">
                    <h4 className="text-lg font-semibold text-white mb-2">{category.title}</h4>
                    <p className="text-gray-300 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Demo */}
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-4">Live Sentiment Analysis Demo</h4>
                <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                  <p className="text-gray-300 mb-2">Sample Social Media Post:</p>
                  <p className="text-white font-medium">
                    "Just tried the new AI feature update - absolutely love how intuitive it is! The response time is incredible, though it took me a moment to get used to the new interface. A bit frustrated with the pricing change, but the value is definitely there. Can't wait to see what's next! 🚀"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-3">Emotional Breakdown</h5>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Joy</span>
                          <span className="text-gray-300">45%</span>
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Excitement</span>
                          <span className="text-gray-300">30%</span>
                        </div>
                        <div className="w-full bg-blue-900/50 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Frustration</span>
                          <span className="text-gray-300">15%</span>
                        </div>
                        <div className="w-full bg-red-900/50 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white mb-3">Sentiment Overview</h5>
                    <div className="space-y-3">
                      <div className="bg-green-900/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-green-300">Positive</span>
                          <span className="text-green-300">75%</span>
                        </div>
                        <div className="w-full bg-green-900/50 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="bg-red-900/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-red-300">Negative</span>
                          <span className="text-red-300">15%</span>
                        </div>
                        <div className="w-full bg-red-900/50 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-300">Neutral</span>
                          <span className="text-gray-300">10%</span>
                        </div>
                        <div className="w-full bg-gray-600/50 rounded-full h-2">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-semibold text-white mb-3">Key Phrases & Topics</h5>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">AI feature (+)</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">intuitive (+)</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">response time (+)</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">pricing change (-)</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">new interface (n)</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">#TechInnovation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <h3 className="text-3xl font-bold text-white">🤖 Custom Chatbots & More</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Custom Chatbots',
                  description: 'Intelligent conversational AI for your business',
                  icon: <MessageSquare className="h-8 w-8" />,
                  color: 'indigo',
                  examples: ['Customer Support Bot', 'Sales Assistant', 'FAQ Bot']
                },
                {
                  title: 'Content Generation',
                  description: 'AI-powered content creation and optimization',
                  icon: <FileText className="h-8 w-8" />,
                  color: 'yellow',
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
                },
                {
                  title: 'Workflow Automation',
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
                  icon: <Zap className="h-8 w-8" />,
                  color: 'cyan',
              <div key={index} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors">
                <div className="relative h-40">
              ].map((service, index) => (
                <div key={index} className={`bg-gray-800/30 p-6 rounded-lg border border-gray-700 hover:border-${service.color}-500/50 transition-colors`}>
                  <div className={`text-${service.color}-400 mb-4`}>
                      <h3 className="text-base font-semibold text-white mb-1">{category.title}</h3>
                      <p className="text-white/80 text-xs">{category.description}</p>
                  <h4 className="text-xl font-semibold text-white mb-3">{service.title}</h4>
                <div className="p-3 bg-gray-800/50">
                  <div className="flex flex-wrap gap-1">
                <div className="p-3 bg-gray-800/50">
                      <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                        {example}
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{example}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="aspect-[9/16] w-48">
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">NovaNexus</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're Ravi and Tirth—passionate IT professionals dedicated to making AI accessible and practical for New Zealand businesses. Our mission is to help fellow Kiwis harness the power of AI to grow their businesses and improve their operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <CheckCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Mission</h3>
              <p className="text-gray-400">
                To make AI simple, approachable, and useful for everyone in New Zealand, empowering local businesses to thrive with technology.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Vision</h3>
              <p className="text-gray-400">
                A New Zealand where every business feels confident using AI to improve their operations and contribute to our local economy.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Commitment</h3>
              <p className="text-gray-400">
                Personal support, practical solutions, and community-first approach to help you succeed with AI technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started Today</h2>
            <p className="text-xl text-gray-300">
              Ready to transform your business with AI? Get in touch and let's discuss your needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-green-400 mb-2">Thank you for your message!</h4>
                  <p className="text-gray-300">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-6">
                <h4 className="font-semibold text-white mb-3 text-sm">Emotional Breakdown</h4>
                <div className="space-y-3">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
              <p className="text-white font-medium text-sm">
                </form>
              )}
            </div>

            <div className="space-y-8">
                      <div className="flex justify-between text-xs mb-1">
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-white">contact@novanexus.ai</span>
                      <div className="w-full bg-gray-600 rounded-full h-1.5">
                <div className="flex items-center mb-4">
                          className={`bg-${item.color}-500 h-1.5 rounded-full`} 
                  <span className="text-white">+64 21 123 4567</span>
                </div>
                <div className="flex items-center">
                <h4 className="font-semibold text-white mb-3 text-sm">Sentiment Overview</h4>
                <div className="space-y-3">
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Why Choose NovaNexus?</h3>
                    <div key={index} className={`bg-${item.color}-50/10 p-2 rounded-lg`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-medium text-${item.color}-400 text-xs`}>{item.sentiment}</span>
                        <span className={`text-${item.color}-400 text-xs`}>{item.percentage}%</span>
                  </li>
                      <div className={`w-full bg-${item.color}-200/20 rounded-full h-1.5`}>
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          className={`bg-${item.color}-500 h-1.5 rounded-full`} 
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Ongoing support and training included</span>
                  </li>
                </ul>
              </div>
              <div className="p-4">
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-2 text-sm">Key Phrases & Topics</h4>
              <div className="flex flex-wrap gap-1">

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between md:flex-row">
                <div className="flex flex-wrap gap-1">
              <img src="/novanexus_logo.png" className="h-8 w-8" alt="Nova Nexus Logo" />
                    <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                  <span key={index} className={`px-2 py-1 bg-${item.color}-100/20 text-${item.color}-300 rounded-full text-xs border border-${item.color}-500/30`}>
              </span>
            </div>
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} NovaNexus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}