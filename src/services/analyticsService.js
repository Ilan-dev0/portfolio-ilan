import { getConnection } from '../config/database.js';

const POLLING_INTERVAL = 5000; // Intervalo de 5 segundos para polling

export const AnalyticsService = {
  async registerVisit(visitorInfo) {
    try {
      const connection = await getConnection();
      const [existingVisitor] = await connection.execute(
        'SELECT * FROM visitors WHERE ip = ?',
        [visitorInfo.ip]
      );

      if (existingVisitor.length > 0) {
        await connection.execute(
          'UPDATE visitors SET last_visit = NOW(), total_visits = total_visits + 1 WHERE ip = ?',
          [visitorInfo.ip]
        );
      } else {
        await connection.execute(
          'INSERT INTO visitors (ip, first_visit, last_visit) VALUES (?, NOW(), NOW())',
          [visitorInfo.ip]
        );
      }

      await connection.execute(
        'INSERT INTO access_logs (ip, city, region, country, timestamp) VALUES (?, ?, ?, ?, NOW())',
        [visitorInfo.ip, visitorInfo.city, visitorInfo.region, visitorInfo.country]
      );

      return true;
    } catch (error) {
      console.error('Erro ao registrar visita:', error.message);
      return false;
    }
  },

  async updateActiveSession(sessionId, ip) {
    try {
      const connection = await getConnection();
      await connection.execute(
        'INSERT INTO active_sessions (session_id, ip, last_activity) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE last_activity = NOW()',
        [sessionId, ip]
      );
      return true;
    } catch (error) {
      console.error('Erro ao atualizar sessão ativa:', error.message);
      return false;
    }
  },

  async getAnalytics() {
    try {
      const connection = await getConnection();
      
      // Obter total de visitantes únicos
      const [totalVisitorsResult] = await connection.execute('SELECT COUNT(*) as total FROM visitors');
      
      // Obter visitantes ativos (últimos 5 minutos)
      const [activeVisitorsResult] = await connection.execute(
        'SELECT COUNT(DISTINCT ip) as active FROM active_sessions WHERE last_activity > DATE_SUB(NOW(), INTERVAL 5 MINUTE)'
      );

      // Obter logs de acesso (últimas 24 horas)
      const [accessLogs] = await connection.execute(
        'SELECT * FROM access_logs WHERE timestamp > DATE_SUB(NOW(), INTERVAL 24 HOUR) ORDER BY timestamp DESC'
      );

      return {
        totalVisitors: totalVisitorsResult[0].total,
        activeVisitors: activeVisitorsResult[0].active,
        accessLogs: accessLogs
      };
    } catch (error) {
      console.error('Erro ao obter analytics:', error.message);
      return {
        totalVisitors: 0,
        activeVisitors: 0,
        accessLogs: []
      };
    }
  },

  startPolling(callback) {
    const pollAnalytics = async () => {
      try {
        const data = await this.getAnalytics();
        callback(data);
      } catch (error) {
        console.error('Erro durante polling de analytics:', error);
      }
    };

    // Iniciar polling imediatamente
    pollAnalytics();

    // Configurar intervalo de polling
    const intervalId = setInterval(pollAnalytics, POLLING_INTERVAL);
    return () => clearInterval(intervalId); // Retorna função para parar o polling
  }
};