
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // This would usually connect to an API
    toast({
      title: "Success!",
      description: "You've subscribed to our newsletter.",
    });
    
    setEmail('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-bottle-100/30 -top-20 -right-20 blur-3xl"></div>
        <div className="absolute w-72 h-72 rounded-full bg-navy-100/20 bottom-10 left-10 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Stay in the Loop</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive deals, new product alerts, and hydration tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow h-12 border-2 focus:border-bottle-400"
              required
            />
            <Button 
              type="submit"
              className="h-12 px-6 bg-bottle-600 hover:bg-bottle-700 text-white transition-colors"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-gray-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center gap-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-navy-800">10k+</div>
              <div className="text-gray-600">Satisfied Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-navy-800">50+</div>
              <div className="text-gray-600">Premium Designs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-navy-800">100%</div>
              <div className="text-gray-600">Eco-friendly</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
