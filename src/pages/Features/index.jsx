import React from 'react';
import { 
  Book, Award, Users, Brain, Flash, Star, 
  Video, MessageSquare, Box, Code
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths adapted to your skill level and goals.'
    },
    {
      icon: Video,
      title: 'Interactive Lessons',
      description: 'Learn through hands-on exercises and real-world projects.'
    },
    {
      icon: MessageSquare,
      title: 'Expert Mentorship',
      description: 'Get guidance from industry professionals in your field.'
    },
    {
      icon: Star,
      title: 'Skill Assessment',
      description: 'Regular assessments to track your progress and identify areas for improvement.'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join a community of learners and share experiences.'
    },
    {
      icon: Code,
      title: 'Practice Projects',
      description: 'Build your portfolio with guided projects and challenges.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Platform Features</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Discover all the tools and features designed to accelerate your learning journey.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:border-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 p-3 mb-4">
                      <Icon className="h-full w-full text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-muted">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Castle Atlas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Traditional Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <li className="text-text-muted">Fixed learning pace</li>
                <li className="text-text-muted">Generic curriculum</li>
                <li className="text-text-muted">Limited interaction</li>
                <li className="text-text-muted">Theoretical focus</li>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Castle Atlas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <li className="text-text">Adaptive learning paths</li>
                <li className="text-text">Personalized content</li>
                <li className="text-text">Interactive exercises</li>
                <li className="text-text">Practical projects</li>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already mastering new skills.
          </p>
          <Button size="lg">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Features;