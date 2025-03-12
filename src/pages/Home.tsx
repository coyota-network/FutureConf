import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Users, Share2, MessageSquare, Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { TestimonialSection } from '../components/TestimonialSection';

function Home() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleMeetingAction = (type: 'start' | 'schedule') => {
    if (session) {
      navigate('/dashboard');
    } else {
      openAuthModal('signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex flex-col">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />

      {/* Hero Section */}
      <div className="relative flex-grow">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 opacity-50 pointer-events-none" />
        
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">FutureConf</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                About
              </Link>
              <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                Pricing
              </Link>
              <Link to="/support" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                Support
              </Link>
              <ThemeToggle />
              
              {session ? (
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </button>
              ) : (
                <div className="flex gap-4">
                  <button 
                    className="btn-secondary"
                    onClick={() => openAuthModal('login')}
                  >
                    Log In
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => openAuthModal('signup')}
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 py-20">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Future of Video Conferencing is Here
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience seamless collaboration with our next-generation platform.
            Crystal clear video, immersive audio, and powerful tools at your fingertips.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              className="btn-primary"
              onClick={() => handleMeetingAction('start')}
            >
              Start Meeting Now
            </button>
            <button 
              className="btn-secondary"
              onClick={() => handleMeetingAction('schedule')}
            >
              Schedule Meeting
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">
          Everything you need for seamless virtual collaboration
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Video />}
            title="HD Video"
            description="Crystal clear video quality with adaptive streaming technology"
          />
          <FeatureCard 
            icon={<Users />}
            title="Team Collaboration"
            description="Host meetings with up to 100 participants with full interaction"
          />
          <FeatureCard 
            icon={<Share2 />}
            title="Screen Sharing"
            description="Share your screen with one click, including system audio"
          />
          <FeatureCard 
            icon={<MessageSquare />}
            title="Chat & Notes"
            description="Built-in chat and collaborative note-taking features"
          />
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-lighter py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">FutureConf</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Revolutionizing virtual communication
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">About</Link></li>
                <li><Link to="/support" className="text-gray-600 dark:text-gray-400 hover:text-primary">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} FutureConf. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div 
      className="card p-6"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}

export default Home;