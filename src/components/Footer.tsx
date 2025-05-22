
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">PixelPour</h3>
            <p className="text-gray-600 mb-6">
              Premium bottles designed for everyday adventures. Sustainable, stylish, and built to last.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-500 hover:text-indigo-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-indigo-500 hover:text-indigo-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-indigo-500 hover:text-indigo-700 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-700 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-indigo-700 transition-colors">Shop</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Collections</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Warranty</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-violet-500" />
                <span className="text-gray-600">123 Bottle Street, Design District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-violet-500" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-violet-500" />
                <span className="text-gray-600">info@pixelpour.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 PixelPour. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-700 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-indigo-700 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-indigo-700 text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
