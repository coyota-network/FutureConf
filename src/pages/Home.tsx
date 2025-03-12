import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Users, Share2, MessageSquare, Sparkles } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
    <div className="min-h-screen bg-dark flex flex-col">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />

      {/* Hero Section */}
      <div className="relative flex-grow">
        {/* Gradient overlay with pointer-events disabled so clicks pass through */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 opacity-50 pointer-events-none" />
        
        {/* Adding relative and z-10 to ensure content is clickable */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <nav className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">FutureConf</span>
            </div>
            <div className="flex gap-6">
              {session ? (
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </nav>

          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-6xl font-bold mb-6 gradient-text leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              The Future of Video Conferencing is Here
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience seamless collaboration with our next-generation platform.
              Crystal clear video, immersive audio, and powerful tools at your fingertips.
            </motion.p>
            <motion.div 
              className="flex gap-4"
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
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
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

      {/* Footer */}
      <footer className="bg-dark-lighter py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">FutureConf</span>
            </div>
            <p className="text-gray-400">
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
      className="glass-effect p-6 rounded-xl"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

export default Home;
