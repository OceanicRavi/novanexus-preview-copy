import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import emailjs from '@emailjs/browser';
import { config } from '../config';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        config.emailJs.serviceId, // Replace with your EmailJS service ID
        config.emailJs.templateId, // Replace with your EmailJS template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          user_message: formData.message,
        },
        config.emailJs.publicKey // Replace with your EmailJS public key
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team to discuss how we can help transform your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {isSubmitted ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-green-600">Thank you for your message!</h3>
                <p className="text-gray-600 mt-2">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Schedule a Meeting</h2>
              <InlineWidget url={`https://calendly.com/${config.calendly.username}`} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-600 mr-3" />
                  <span>contact@novanexus.ai</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-600 mr-3" />
                  <span>+64 02XXXXXXXX</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Our Beautiful New Zealand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}