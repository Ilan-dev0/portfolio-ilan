import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer, shouldReduceMotion } from "../utils/motion";

// Componente de fallback simples para usar durante o carregamento
const LoadingFallback = () => <div className="loading-placeholder"></div>;

const StarWrapper = (Component, idName) =>
  function HOC() {
    // Verifica se o usuário prefere animações reduzidas
    const prefersReducedMotion = shouldReduceMotion();
    
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.1 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        // Desativa animações se o usuário preferir movimento reduzido
        animate={prefersReducedMotion ? "visible" : undefined}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
