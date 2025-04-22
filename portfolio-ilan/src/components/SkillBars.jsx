// SkillBars.js
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const NeonSkillsBar = ({ label, value }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      while (isAnimating) {
        await controls.start({
          boxShadow: '0 0 8px 2px #ff3864',
          opacity: 1,
          transition: { duration: 0.4, ease: 'linear' },
        });
        await controls.start({
          boxShadow: '0 0 10px 5px #ff3864',
          opacity: 0.8,
          transition: { duration: 0.4, ease: 'linear' },
        });
        await controls.start({
          boxShadow: '0 0 8px 2px #ff3864',
          opacity: 0.6,
          transition: { duration: 0.4, ease: 'linear' },
        });
        await controls.start({
          boxShadow: '0 0 10px 5px #ff3864',
          opacity: 0.4,
          transition: { duration: 0.4, ease: 'linear' },
        });
        await controls.start({
          boxShadow: '0 0 0 0 #ff3864',
          opacity: 0.8,
          transition: { duration: 0.4, ease: 'linear' },
        });

        // Adiciona uma transição suave entre o final e o início da animação
        await controls.start({
          boxShadow: '0 0 8px 2px #ff3864',
          opacity: 1,
          transition: { duration: 0.4, ease: 'linear' },
        });
      }
    };

    startAnimation();

    return () => setIsAnimating(false);
  }, [controls, isAnimating]);

  return (
    <div className="max-w-md mx-auto mb-6">
      <div className="mb-2 font-bold text-white">{label}</div>
      <div className="relative">
        <motion.div
          className="h-6 rounded bg-gradient-to-r from-rose-600 via-pink-500 to-red-400"
          animate={controls}
        />
        <span className="text-white font-bold absolute inset-0 flex items-center justify-center">
          {value}%
        </span>
      </div>
    </div>
  );
};

const SkillBars = ({ skills }) => (
  <div className="flex flex-wrap justify-center gap-6">
    {skills.map((skill, index) => (
      <div className="w-28 text-center" key={index}>
        <NeonSkillsBar label={skill.label} value={skill.value} />
      </div>
    ))}
  </div>
);

export default SkillBars;
