import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book, Sun, Moon, Menu, X, ChevronRight, Users, Award, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LearningDashboard from './pages/LearningDashboard';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const features = [
    {
      icon: BookOpen,
      title: 'Extensive Library',
      description: 'Access thousands of structured learning paths across various disciplines'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with peers and experts in your field of study'
    },
    {
      icon: Award,
      title: 'Skill Certification',
      description: 'Earn verifiable certificates as you master new skills'
    }
  ];

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/dashboard', label: 'Dashboard' }
  ];

  const Header = () => (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Castle Atlas</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navigationLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`text-text-muted hover:text-primary transition-colors duration-200 
                              ${location.pathname === to ? 'text-primary font-medium' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full p-2 hover:bg-primary/10 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-full p-2 hover:bg-primary/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border">
          <ul className="container mx-auto px-4 py-4 space-y-4">
            {navigationLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center justify-between text-text-muted hover:text-primary transition-colors duration-200
                            ${location.pathname === to ? 'text-primary font-medium' : ''}`}
                >
                  {label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );

  // Page Components
  const Home = () => (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Master Any Skill with
            <span className="text-primary"> Castle Atlas</span>
          </h2>
          <p className="text-xl text-text-muted mb-8 animate-slide-up">
            Your personalized journey to excellence starts here
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
            <Link to="/dashboard" className="btn-primary px-8 py-3">
              Get Started
            </Link>
            <Link to="/about" className="btn-outline px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Castle Atlas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="group hover:border-primary">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon className="h-full w-full text-primary" />
                  </div>
                  <CardTitle className="mt-4">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-muted">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already mastering new skills with Castle Atlas.
            Start your journey today and unlock your full potential.
          </p>
          <Link to="/dashboard" className="btn-primary px-8 py-3">
            Start Learning Now
          </Link>
        </div>
      </section>
    </>
  );

  const About = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Castle Atlas</h1>
      <p className="text-lg text-text-muted">
        Castle Atlas is your comprehensive platform for mastering new skills through structured learning paths.
        Our mission is to make quality education accessible to everyone.
      </p>
    </div>
  );

  const Features = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Features</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="group hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="h-full w-full text-primary" />
              </div>
              <CardTitle className="mt-4">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-muted">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const Pricing = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Pricing</h1>
      <p className="text-lg text-text-muted">
        Choose the plan that best fits your learning journey.
      </p>
    </div>
  );

  const Footer = () => (
    <footer className="bg-background-alt border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-text-muted hover:text-primary">Features</Link></li>
              <li><Link to="/pricing" className="text-text-muted hover:text-primary">Pricing</Link></li>
              <li><Link to="/faq" className="text-text-muted hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-text-muted hover:text-primary">About Us</Link></li>
              <li><Link to="/careers" className="text-text-muted hover:text-primary">Careers</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-text-muted hover:text-primary">Privacy</Link></li>
              <li><Link to="/terms" className="text-text-muted hover:text-primary">Terms</Link></li>
              <li><Link to="/cookies" className="text-text-muted hover:text-primary">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#twitter" className="text-text-muted hover:text-primary">Twitter</a></li>
              <li><a href="#linkedin" className="text-text-muted hover:text-primary">LinkedIn</a></li>
              <li><a href="#github" className="text-text-muted hover:text-primary">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-text-muted">
          <p>© 2025 Castle Atlas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-background text-text">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<LearningDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;