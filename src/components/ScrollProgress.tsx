import React from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 inset-x-0 z-50 h-[2px] bg-transparent"
    >
      <motion.div
        style={{
          scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress,
          transformOrigin: '0% 50%',
        }}
        className="h-full w-full bg-[var(--silver-highlight)] opacity-85"
      />
    </div>
  );
};
