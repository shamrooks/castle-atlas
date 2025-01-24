import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const [billing, setBilling] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: { monthly: 0, annual: 0 },
      features: [
        'Access to 10 skills',
        'Basic tutorials',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: { monthly: 9.99, annual: 99 },
      features: [
        'Access to 100+ skills',
        'Premium tutorials',
        'Priority support',
        'Progress tracking',
        'Personalized roadmap'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 19.99, annual: 199 },
      features: [
        'Unlimited access',
        'Custom learning paths',
        '24/7 support',
        'Team management',
        'API access',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your learning journey
          </p>
          <div className="inline-flex items-center bg-background-alt rounded-lg p-1">
            <Button
              variant={billing === 'monthly' ? 'primary' : 'ghost'}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </Button>
            <Button
              variant={billing === 'annual' ? 'primary' : 'ghost'}
              onClick={() => setBilling('annual')}
            >
              Annual (Save 20%)
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? 'border-primary shadow-lg md:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${plan.price[billing]}
                    </span>
                    {plan.price[billing] > 0 && (
                      <span className="text-text-muted">
                        /{billing === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-alt">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Plan?</h2>
          <p className="text-text-muted mb-8">
            Contact us for custom pricing and features tailored to your needs.
          </p>
          <Button size="lg" variant="outline">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;