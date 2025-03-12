import React from 'react';
import { Check } from 'lucide-react';
import { BackButton } from '../components/BackButton';

function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="container mx-auto px-4 py-20">
        <BackButton />
        
        <div className="text-center mb-16">
          <h1 className="section-title">Simple, Transparent Pricing</h1>
          <p className="section-subtitle">
            Choose the perfect plan for your needs. All plans include core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Basic"
            price="Free"
            description="Perfect for small teams"
            features={[
              'Up to 100 participants',
              '40-minute meeting limit',
              'HD video quality',
              'Screen sharing',
              'Chat support'
            ]}
            buttonText="Get Started"
            isPopular={false}
          />
          <PricingCard
            title="Pro"
            price="$15"
            description="For growing businesses"
            features={[
              'Up to 300 participants',
              'Unlimited meeting duration',
              'Full HD video quality',
              'Advanced screen sharing',
              'Priority support',
              'Custom branding',
              'Meeting recordings'
            ]}
            buttonText="Start Free Trial"
            isPopular={true}
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            description="For large organizations"
            features={[
              'Unlimited participants',
              'Unlimited everything',
              '4K video quality',
              'Advanced security',
              '24/7 dedicated support',
              'Custom integration',
              'API access'
            ]}
            buttonText="Contact Sales"
            isPopular={false}
          />
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Need a custom solution?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Contact our sales team for a tailored package that meets your specific needs.
          </p>
          <button className="btn-secondary">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  buttonText,
  isPopular 
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}) {
  return (
    <div className={`
      card p-6
      ${isPopular 
        ? 'bg-primary text-black transform scale-105 shadow-xl border-primary' 
        : ''
      }
    `}>
      {isPopular && (
        <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <div className="mt-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-sm">/month</span>}
      </div>
      <p className="mt-2 text-sm">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        className={`
          w-full mt-8 py-3 rounded-full font-medium
          ${isPopular 
            ? 'bg-black text-white hover:bg-gray-900' 
            : 'btn-primary'
          }
        `}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Pricing;