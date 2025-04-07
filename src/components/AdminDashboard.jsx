import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState({
    total: 0,
    active: 0
  });

  useEffect(() => {
    // Simular dados de visitantes
    const interval = setInterval(() => {
      setVisitors(prev => ({
        total: prev.total + Math.floor(Math.random() * 2),
        active: Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Painel de Controle</p>
        <h2 className={styles.sectionHeadText}>Admin Dashboard</h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 0.75)}
          className="bg-tertiary p-6 rounded-2xl border border-secondary/30"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Visitantes Totais
          </h3>
          <div className="text-4xl font-bold text-white">{visitors.total}</div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.3, 0.75)}
          className="bg-tertiary p-6 rounded-2xl border border-secondary/30"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Visitantes Ativos
          </h3>
          <div className="text-4xl font-bold text-white">{visitors.active}</div>
        </motion.div>

        <motion.div
          variants={fadeIn("right", "spring", 0.4, 0.75)}
          className="bg-tertiary p-6 rounded-2xl border border-secondary/30 md:col-span-2"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Logs de Acesso
          </h3>
          <div className="h-64 overflow-y-auto bg-black/30 rounded-lg p-4">
            <div className="space-y-2 text-white/70">
              {/* Simular logs de acesso */}
              <div>✓ Novo acesso - IP: 192.168.1.*** - {new Date().toLocaleString()}</div>
              <div>✓ Token encontrado - IP: 172.16.0.*** - {new Date().toLocaleString()}</div>
              <div>✓ Tentativa de login - IP: 10.0.0.*** - {new Date().toLocaleString()}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(AdminDashboard, "admin");