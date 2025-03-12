import React from 'react';
import { Users, Award, Clock, Globe } from 'lucide-react';
import { BackButton } from '../components/BackButton';

function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="container mx-auto px-4 py-20">
        <BackButton />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About FutureConf</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're revolutionizing the way people connect and collaborate virtually.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Founded in 2025, FutureConf emerged from a vision to create seamless, 
              high-quality video conferencing accessible to everyone. Our platform 
              combines cutting-edge technology with intuitive design to deliver an 
              unparalleled communication experience.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To empower global collaboration by providing reliable, secure, and 
              innovative video conferencing solutions that bring people together, 
              no matter where they are.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <StatCard
            icon={<Users className="w-8 h-8 text-primary" />}
            number="1M+"
            label="Active Users"
          />
          <StatCard
            icon={<Globe className="w-8 h-8 text-primary" />}
            number="150+"
            label="Countries"
          />
          <StatCard
            icon={<Clock className="w-8 h-8 text-primary" />}
            number="99.9%"
            label="Uptime"
          />
          <StatCard
            icon={<Award className="w-8 h-8 text-primary" />}
            number="50+"
            label="Awards"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, number, label }: { 
  icon: React.ReactNode;
  number: string;
  label: string;
}) {
  return (
    <div className="card p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{number}</h3>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
}

export default About;