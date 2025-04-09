import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

const retryOperation = async (operation, retries = MAX_RETRIES) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
    }
  }
};

export const AnalyticsService = {
  async registerVisit(visitorInfo) {
    try {
      const response = await retryOperation(() =>
        axios.post(`${API_URL}/api/analytics/visit`, visitorInfo)
      );
      return response.data.success;
    } catch (error) {
      console.error('Erro ao registrar visita após várias tentativas:', error.message);
      return false;
    }
  },

  async updateActiveSession(sessionId, ip) {
    try {
      const response = await retryOperation(() =>
        axios.post(`${API_URL}/api/analytics/session`, { sessionId, ip })
      );
      return response.data.success;
    } catch (error) {
      console.error('Erro ao atualizar sessão ativa após várias tentativas:', error.message);
      return false;
    }
  },

  async getAnalytics() {
    try {
      const response = await retryOperation(() =>
        axios.get(`${API_URL}/api/analytics`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`
          }
        })
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao obter analytics após várias tentativas:', error.message);
      return {
        totalVisitors: 0,
        activeVisitors: 0,
        accessLogs: []
      };
    }
  }
};