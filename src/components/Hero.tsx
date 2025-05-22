
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.3 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };
  
  const bottleVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: "easeOut"
      } 
    },
    hover: { 
      y: -10, 
      transition: { 
        yoyo: Infinity, 
        duration: 2,
        ease: "easeInOut"
      } 
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-purple-500/10 -bottom-20 -left-20 blur-3xl"></div>
        <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 top-20 right-10 blur-xl"></div>
        <div className="absolute w-64 h-64 rounded-full bg-violet-500/10 bottom-40 right-20 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center">
        <motion.div 
          className="flex-1 max-w-xl mr-0 lg:mr-12 z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            variants={itemVariants}
          >
            Discover Your <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Perfect</span> Bottle
          </motion.h1>
          
          <motion.p 
            className="text-lg text-indigo-100 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Elevate your hydration experience with our premium collection of designer bottles. Sustainable, stylish, and built to last for all your adventures.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
                Shop Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-violet-400 text-violet-300 hover:bg-violet-950/30 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex-1 mt-12 lg:mt-0 relative"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={bottleVariants}
        >
          <div className="relative h-[500px] w-full max-w-[400px] mx-auto">
            {/* Main bottle image */}
            <motion.img 
              src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop" 
              alt="Premium water bottle" 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 md:w-72 z-20 animate-float drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            />
            {/* Additional bottles for design */}
            <motion.img 
              src="https://images.unsplash.com/photo-1581152309595-c304b4d05c14?w=600&auto=format&fit=crop" 
              alt="Stylish bottle" 
              className="absolute left-5 top-1/4 w-32 md:w-44 rotate-12 opacity-80 z-10 drop-shadow-[0_0_10px_rgba(79,70,229,0.2)]"
            />
            <motion.img 
              src="https://images.unsplash.com/photo-1610631687337-04552bfb8d85?w=600&auto=format&fit=crop" 
              alt="Modern bottle" 
              className="absolute right-5 bottom-1/4 w-32 md:w-40 -rotate-12 opacity-80 z-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]"
            />
            {/* Circle highlight */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-indigo-500/10 to-violet-500/5 rounded-full blur-md z-0"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-indigo-400/50 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-indigo-500/70 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
