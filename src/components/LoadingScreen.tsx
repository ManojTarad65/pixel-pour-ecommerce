
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Crafting Excellence...",
    "Brewing Perfection...", 
    "Loading Amazing Products...",
    "Almost Ready..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

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
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden"
      >
        {/* Animated wave background */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0.2)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
              fill="url(#wave1)"
              animate={{
                d: [
                  "M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z",
                  "M0,450 Q300,250 600,450 T1200,450 L1200,800 L0,800 Z",
                  "M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z"
              fill="url(#wave2)"
              animate={{
                d: [
                  "M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z",
                  "M0,450 Q300,350 600,450 T1200,450 L1200,800 L0,800 Z",
                  "M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0">
          {/* Rotating hexagons */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 border-2 border-white/20"
              style={{
                left: `${15 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 60}%`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Floating triangles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30"
              style={{
                left: `${10 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="text-center z-10 relative">
          {/* Central spinning logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="mb-8 relative"
          >
            <div className="w-24 h-24 mx-auto mb-4 relative">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-purple-400 to-blue-500"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.8), transparent)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner core */}
              <div className="absolute inset-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <motion.div
                  className="w-8 h-8 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Orbiting dots */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    rotate: 360,
                    x: 35 * Math.cos((i * 120 * Math.PI) / 180),
                    y: 35 * Math.sin((i * 120 * Math.PI) / 180)
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Brand name with letter animation */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            {Array.from("PixelPour").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent"
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 360, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Loading text with slide animation */}
          <motion.div
            key={currentText}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-white text-lg md:text-xl font-light">
              {loadingTexts[currentText]}
            </p>
          </motion.div>

          {/* Progress bar with glow effect */}
          <div className="w-80 max-w-sm mx-auto">
            <div className="bg-white/10 rounded-full h-3 mb-4 overflow-hidden backdrop-blur-sm border border-white/20">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            <motion.p
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/70 text-sm font-medium"
            >
              {progress}%
            </motion.p>
          </div>

          {/* Pulsing dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
