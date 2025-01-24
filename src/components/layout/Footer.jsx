import React from 'react';

const Footer = () => (
  <footer className="bg-background-alt py-12 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about">About</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="https://twitter.com">Twitter</a></li>
            <li><a href="https://linkedin.com">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-text-muted">
        <p>© 2025 Castle Atlas. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;