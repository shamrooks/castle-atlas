import React from 'react';
import { Users, Trophy, Book, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  const stats = [
    { label: 'Active Learners', value: '50K+', icon: Users },
    { label: 'Skills Available', value: '500+', icon: Book },
    { label: 'Expert Mentors', value: '200+', icon: Trophy },
    { label: 'Learning Hours', value: '1M+', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-text-muted">
              At Castle Atlas, we're transforming skill development through personalized, 
              interactive learning experiences. Our mission is to make quality education 
              accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-text-muted">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-text-muted mb-6">
                Founded in 2025, Castle Atlas emerged from a simple observation: 
                traditional learning methods weren't keeping pace with modern needs. 
                We built a platform that adapts to each learner's unique journey, 
                combining AI-powered recommendations with human expertise.
              </p>
              <Button size="lg">Join Our Journey</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-primary/10 rounded-lg"></div>
              <div className="aspect-square bg-primary/20 rounded-lg mt-8"></div>
              <div className="aspect-square bg-primary/30 rounded-lg -mt-8"></div>
              <div className="aspect-square bg-primary/40 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to shape 
            the future of learning. Check out our open positions.
          </p>
          <Button variant="outline" size="lg">
            View Careers
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;