import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import axios from 'axios';

// Remove a função getVisitorInfo, não é necessária no dashboard
const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    activeVisitors: 0,
    accessLogs: [] // Mantém os logs de acesso gerais
  });
  const [detailedTrackingData, setDetailedTrackingData] = useState([]); // Novo estado para dados detalhados

  useEffect(() => {
    // Verificar autenticação
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken !== 'CYB3RSH3LL_FOR_CYB3RR4TS') {
      window.location.href = '/';
      return;
    }

    // Remove sessionId e reconnectInterval se não forem mais usados

    const loadDashboardData = async () => {
      try {
        // Busca dados de analytics gerais
        const analyticsResponse = await axios.get('/api/analytics', {
          headers: { Authorization: `Bearer ${adminToken}` } // Envia token
        });
        setAnalytics(analyticsResponse.data);

        // Busca dados de rastreamento detalhados
        const trackingResponse = await axios.get('/api/tracking-data', {
          headers: { Authorization: `Bearer ${adminToken}` } // Envia token
        });
        setDetailedTrackingData(trackingResponse.data);

      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        if (error.response && error.response.status === 401) {
           console.error("Erro de autenticação ao buscar dados.");
           // Poderia redirecionar para login ou mostrar mensagem
        }
      }
    };

    // Carrega os dados ao montar o componente
    loadDashboardData();

    // Remove a lógica de initializeVisitor e polling

    // Cleanup (se necessário)
    return () => {
      // Nenhuma limpeza específica necessária por enquanto
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

        {/* NOVA SEÇÃO: Tabela de Rastreamento Detalhado */}
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className="bg-tertiary p-6 rounded-2xl border border-secondary/30 md:col-span-2 mt-8"
        >
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Rastreamento Detalhado (Últimos 100)
          </h3>
          <div className="h-96 overflow-y-auto bg-black/30 rounded-lg">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="sticky top-0 bg-tertiary/80 backdrop-blur-sm">
                <tr>
                  <th className="p-2">Timestamp</th>
                  <th className="p-2">IP</th>
                  <th className="p-2">Localização</th>
                  <th className="p-2">Página</th>
                  <th className="p-2">Tempo (s)</th>
                  <th className="p-2">Dispositivo</th>
                  <th className="p-2">Navegador</th>
                </tr>
              </thead>
              <tbody>
                {detailedTrackingData.map((track, index) => (
                  <tr key={index} className="border-t border-black/50 hover:bg-black/40">
                    <td className="p-2">{new Date(track.timestamp).toLocaleString()}</td>
                    <td className="p-2">{track.ip_address}</td>
                    <td className="p-2">{track.city}, {track.region}, {track.country}</td>
                    <td className="p-2">{track.visited_page}</td>
                    <td className="p-2">{track.time_spent_seconds ?? '-'}</td>
                    <td className="p-2">{track.device_type}</td>
                    <td className="p-2">{track.browser_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;