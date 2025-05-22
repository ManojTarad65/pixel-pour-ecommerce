
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      <main>
        <div className="pt-24 pb-16 gradient-ocean">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
              <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-16 container mx-auto px-4 bg-gradient-to-b from-[#0f172a] to-indigo-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-100">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-white/10 border-white/20 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-100">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" className="bg-white/10 border-white/20 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-100">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" className="bg-white/10 border-white/20 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-100">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" className="min-h-[120px] bg-white/10 border-white/20 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card className="glass mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent p-3 rounded-full">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Email Us</p>
                        <p className="text-indigo-200">support@pixelpour.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-accent p-3 rounded-full">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Call Us</p>
                        <p className="text-indigo-200">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-accent p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Our Location</p>
                        <p className="text-indigo-200">123 Design Street, Creative City</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-accent p-3 rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Business Hours</h2>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between p-2 border-b border-white/10">
                      <span className="text-indigo-200">Monday - Friday:</span>
                      <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between p-2 border-b border-white/10">
                      <span className="text-indigo-200">Saturday:</span>
                      <span className="font-medium text-white">10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between p-2">
                      <span className="text-indigo-200">Sunday:</span>
                      <span className="font-medium text-white">Closed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
