
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const About = () => {
  const storyItems = [
    {
      year: "2015",
      title: "A Simple Idea",
      content: "PixelPour began with a simple idea: create beautiful, functional bottles that reduce plastic waste while meeting everyday needs."
    },
    {
      year: "2018",
      title: "Going Global",
      content: "After 3 years of design iterations, sustainability research, and building a passionate team, we launched our first bottles globally."
    },
    {
      year: "2020",
      title: "Sustainability First",
      content: "We revised our manufacturing processes to achieve carbon-neutral production, setting a new standard in the industry."
    },
    {
      year: "2022",
      title: "Innovation Expansion",
      content: "PixelPour expanded our product line with cutting-edge thermal technology and artist collaborations, bringing design and function together."
    },
    {
      year: "2025",
      title: "Looking Forward",
      content: "Today, we continue to innovate while staying true to our core mission: creating beautiful, sustainable bottles for a better planet."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About PixelPour</h1>
              <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
                Learn about our mission to create sustainable, stylish bottles for everyday adventures.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-lg"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent mb-4">Our Mission</h2>
              <div className="bg-gradient-to-r from-violet-500 to-indigo-500 w-20 h-1 mb-6"></div>
              <p className="text-indigo-100 mb-4">
                At PixelPour, we believe that sustainable living should be both beautiful and functional. Our mission is to create products that inspire people to reduce single-use plastic waste without sacrificing style or convenience.
              </p>
              <p className="text-indigo-100">
                Each bottle we design is carefully crafted to combine innovative technology with timeless aesthetics, ensuring that sustainability never comes at the expense of performance or design.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1562766879-ce8c6f04f70d?w=800&auto=format&fit=crop" 
                alt="Team working on bottle designs" 
                className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent mb-4">Our Story</h2>
            <div className="bg-gradient-to-r from-violet-500 to-indigo-500 w-20 h-1 mx-auto mb-6"></div>
            <p className="text-indigo-200 max-w-3xl mx-auto">
              From a small workshop to a global brand, our journey has been driven by passion, innovation, and commitment to sustainability.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {storyItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-indigo-200 mt-2">{item.content}</p>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      <div className="rounded-full h-12 w-12 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg z-10">
                        {item.year}
                      </div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 p-10 glass rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto mb-6">
              Every PixelPour bottle purchased helps eliminate hundreds of single-use plastic bottles. Together, we can make a difference.
            </p>
            <a href="/shop" className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-lg">
              Shop Our Collection
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
