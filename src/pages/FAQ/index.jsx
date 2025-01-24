import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: 'How does Castle Atlas work?',
      answer: 'Castle Atlas provides personalized learning paths based on your skill level and goals. Start by choosing a skill, take an assessment, and follow your customized curriculum.'
    },
    {
      question: 'What skills can I learn?',
      answer: 'We offer a wide range of skills including web development, data analysis, digital marketing, design, and more. New skills are added regularly based on industry demands.'
    },
    {
      question: 'How much does it cost?',
      answer: 'We offer free basic access and premium plans starting at $9.99/month. Check our pricing page for detailed information about plans and features.'
    },
    {
      question: 'Can I switch between plans?',
      answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.'
    },
    {
      question: 'Do you offer certifications?',
      answer: 'Yes, you can earn certificates upon completing skill paths. Our certificates are recognized by industry partners and can be shared on LinkedIn.'
    },
    {
      question: 'How long does it take to learn a skill?',
      answer: 'Learning duration varies based on the skill complexity and your dedication. Most skill paths can be completed in 2-3 months with regular practice.'
    }
  ];

  const categories = [
    'Getting Started',
    'Account & Billing',
    'Learning Experience',
    'Technical Support'
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Find answers to common questions about Castle Atlas
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{faq.question}</h3>
                      {openQuestion === index ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                    {openQuestion === index && (
                      <p className="mt-4 text-text-muted">
                        {faq.answer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-alt">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-text-muted mb-8">
            Can't find the answer you're looking for? Contact our support team.
          </p>
          <Button size="lg">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;