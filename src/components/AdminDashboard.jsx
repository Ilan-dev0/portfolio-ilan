import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { AnalyticsService } from '../services/analyticsService';
import io from 'socket.io-client';
import axios from 'axios';

const getVisitorInfo = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    return {
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name
    };
  } catch (error) {
    console.error('Erro ao obter informações do visitante:', error);
    return {
      ip: 'Não disponível',
      city: 'Não disponível',
      region: 'Não disponível',
      country: 'Não disponível'
    };
  }
};

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    activeVisitors: 0,
    accessLogs: []
  });

  // Verificar autenticação
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken !== 'CYB3RSH3LL_FOR_CYB3RR4TS') {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    let socket;
    let reconnectInterval;
    let sessionId;
    const adminToken = localStorage.getItem('admin_token');

    const connectSocket = () => {
      socket = io('http://localhost:3000', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      socket.on('connect', () => {
        console.log('WebSocket conectado');
        socket.emit('authenticate', adminToken);
      });

      socket.on('disconnect', () => {
        console.log('WebSocket desconectado');
      });

      socket.on('analytics_update', (data) => {
        setAnalytics(data);
      });

      socket.on('connect_error', (error) => {
        console.error('Erro de conexão WebSocket:', error);
        startPolling();
      });
    };

    const startPolling = () => {
      if (!reconnectInterval) {
        reconnectInterval = setInterval(async () => {
          const data = await AnalyticsService.getAnalytics();
          setAnalytics(data);
        }, 5000);
      }
    };

    const initializeVisitor = async () => {
      try {
        const visitorInfo = await getVisitorInfo();
        await AnalyticsService.registerVisit(visitorInfo);
        
        sessionId = Math.random().toString(36).substring(2);
        await AnalyticsService.updateActiveSession(sessionId, visitorInfo.ip);
      } catch (error) {
        console.error('Erro ao inicializar visitante:', error);
      }
    };

    const loadInitialData = async () => {
      try {
        const data = await AnalyticsService.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    };

    initializeVisitor();
    loadInitialData();
    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
      }
    };
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
          <div className="text-4xl font-bold text-white">{analytics.totalVisitors}</div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.3, 0.75)}
          className="bg-tertiary p-6 rounded-2xl border border-secondary/30"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Visitantes Ativos
          </h3>
          <div className="text-4xl font-bold text-white">{analytics.activeVisitors}</div>
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
              {analytics.accessLogs.map((log, index) => (
                <div key={index}>
                  ✓ Novo acesso - IP: {log.ip} - {log.city}, {log.region}, {log.country} - {new Date(log.timestamp).toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;