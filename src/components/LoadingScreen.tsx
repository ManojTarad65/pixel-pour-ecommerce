
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing Experience...",
    "Loading Premium Content...", 
    "Preparing Your Journey...",
    "Almost There..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${15 + Math.floor(i / 4) * 70}%`,
              }}
              animate={{
                rotate: [0, 360],
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3
              }}
            >
              <div 
                className={`w-8 h-8 ${
                  i % 3 === 0 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : i % 3 === 1 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                } rounded-full shadow-lg`}
                style={{
                  filter: 'blur(0.5px)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Central loading animation */}
        <div className="text-center z-10 relative">
          {/* Main logo animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "backOut" }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 mx-auto mb-6 relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 20%, #06b6d4 50%, transparent 80%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: 'conic-gradient(from 180deg, transparent 30%, #8b5cf6 60%, transparent 90%)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner core with morphing effect */}
              <motion.div
                className="absolute inset-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-2xl border border-slate-600"
                animate={{
                  scale: [1, 1.1, 1],
                  borderRadius: ["50%", "30%", "50%"],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Orbiting elements */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full shadow-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: 360,
                    x: 50 * Math.cos((i * 90 * Math.PI) / 180),
                    y: 50 * Math.sin((i * 90 * Math.PI) / 180),
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Brand name with sophisticated animation */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-wider"
          >
            {Array.from("PixelPour").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block bg-gradient-to-r from-slate-200 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                animate={{
                  y: [0, -15, 0],
                  textShadow: [
                    "0 0 10px rgba(6, 182, 212, 0.5)",
                    "0 0 20px rgba(6, 182, 212, 0.8)",
                    "0 0 10px rgba(6, 182, 212, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.3))'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Loading text with fade transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="text-slate-300 text-xl font-light tracking-wide">
                {loadingTexts[currentText]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced progress bar */}
          <div className="w-96 max-w-sm mx-auto">
            <div className="bg-slate-800/50 rounded-full h-2 mb-6 overflow-hidden backdrop-blur-sm border border-slate-700/50 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-400 text-sm font-medium tracking-wider"
            >
              {progress}% Complete
            </motion.div>
          </div>

          {/* Bottom accent dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                style={{
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Corner accent elements */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 border-2 border-cyan-500/30 rounded-lg"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-12 h-12 border-2 border-purple-500/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
