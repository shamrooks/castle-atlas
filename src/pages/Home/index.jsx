import React from 'react';
import { Book, Award, Users, ArrowRight, Star, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Home = () => {
  const skills = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Master modern web technologies and frameworks.'
    },
    {
      icon: '📊',
      title: 'Data Analysis',
      description: 'Learn to analyze and visualize complex data.'
    },
    {
      icon: '📱',
      title: 'Digital Marketing',
      description: 'Create effective digital marketing strategies.'
    },
    {
      icon: '📸',
      title: 'Photography',
      description: 'Capture stunning moments with professional photography techniques.'
    },
    {
      icon: '🍳',
      title: 'Cooking',
      description: 'Learn to cook delicious meals from around the world.'
    },
    {
      icon: '🧘',
      title: 'Yoga',
      description: 'Improve your flexibility and mental well-being with yoga.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-primary overflow-hidden">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Master Any Skill</h1>
          <p className="text-xl mb-8">Your journey to excellence starts here</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Skills Library</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="group hover:border-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-text-muted">{skill.description}</p>
                  <Button variant="ghost" className="w-full mt-4">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-text-muted mb-6">Get the latest updates on new skills and features.</p>
              <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border"
                />
                <Button type="submit">
                  Subscribe
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;