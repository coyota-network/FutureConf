import React from 'react';
import { Mail, Phone, MessageSquare, FileText } from 'lucide-react';
import { BackButton } from '../components/BackButton';

function Support() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="container mx-auto px-4 py-20">
        <BackButton />
        
        <div className="text-center mb-16">
          <h1 className="section-title">Support Center</h1>
          <p className="section-subtitle">
            Need help? We're here for you 24/7. Choose how you'd like to get in touch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <SupportCard
            icon={<MessageSquare className="w-8 h-8" />}
            title="Live Chat"
            description="Chat with our support team"
            action="Start Chat"
          />
          <SupportCard
            icon={<Mail className="w-8 h-8" />}
            title="Email Support"
            description="Get help via email"
            action="Send Email"
          />
          <SupportCard
            icon={<Phone className="w-8 h-8" />}
            title="Phone Support"
            description="Talk to our team"
            action="Call Now"
          />
          <SupportCard
            icon={<FileText className="w-8 h-8" />}
            title="Knowledge Base"
            description="Browse help articles"
            action="View Articles"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem
              question="How do I start a meeting?"
              answer="Click the 'Start Meeting' button on your dashboard to instantly begin a new meeting. You can then share the meeting link with participants."
            />
            <FaqItem
              question="What's the maximum number of participants?"
              answer="Our standard plan supports up to 100 participants per meeting. Enterprise plans can accommodate more participants."
            />
            <FaqItem
              question="Is FutureConf secure?"
              answer="Yes, all meetings are encrypted end-to-end and protected with additional security features like waiting rooms and host controls."
            />
            <FaqItem
              question="Can I record meetings?"
              answer="Yes, meeting recording is available on Pro and Enterprise plans. Recordings are stored securely and can be accessed from your dashboard."
            />
            <FaqItem
              question="How do I share my screen?"
              answer="During a meeting, click the 'Share Screen' button in the meeting controls. You can choose to share your entire screen, a specific window, or a browser tab."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportCard({ 
  icon, 
  title, 
  description, 
  action 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="card p-6 text-center">
      <div className="flex justify-center mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <button className="btn-primary w-full">{action}</button>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="card">
      <button
        className="w-full text-left p-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        <span className="text-primary">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <p className="px-4 pb-4 text-gray-600 dark:text-gray-300">{answer}</p>
      )}
    </div>
  );
}

export default Support;