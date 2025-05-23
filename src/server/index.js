import 'dotenv/config'; // Load .env file
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { AnalyticsService } from '../services/analyticsService.js';
import { GeoLocationService } from '../services/geoLocationService.js';
import { getConnection } from '../config/database.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Middleware de autenticação para rotas administrativas
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== 'CYB3RSH3LL_FOR_CYB3RR4TS') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  next();
};

// Middleware para verificar conexão com banco de dados e registrar visitas
app.use(async (req, res, next) => {
  try {
    const connection = await getConnection();
    if (!connection) {
      throw new Error('Database connection failed');
    }

    // Obter IP real do cliente
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Obter informações de localização
    const locationInfo = await GeoLocationService.getLocationFromIp(ip);
    
    // Registrar visita
    await AnalyticsService.registerVisit(locationInfo);

    next();
  } catch (error) {
    console.error('Database middleware error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Rota para obter dados de analytics (protegida)
app.get('/api/analytics', authMiddleware, async (req, res) => {
  try {
    const analytics = await AnalyticsService.getAnalytics();
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});
// Rota para atualizar sessão ativa (protegida)
app.post('/api/session', authMiddleware, async (req, res) => {
  const { sessionId, ip } = req.body;
  if (!sessionId || !ip) {
    return res.status(400).json({ error: 'sessionId and ip are required' });
  }
  try {
    await AnalyticsService.updateActiveSession(sessionId, ip);
    res.status(200).json({ message: 'Session updated successfully' });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

// Rota para receber dados de rastreamento detalhados do frontend (NOVA)
app.post('/api/track', async (req, res) => {
  const { deviceType, browserName, visitedPage, timeSpentSeconds } = req.body;
  // Obter IP real do cliente (pode ser redundante se o middleware já o fez, mas seguro garantir)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!ip) {
    return res.status(400).json({ error: 'IP address not found' });
  }

  try {
    const connection = await getConnection();
    // Obter informações de localização (pode ser otimizado se o middleware já as buscou)
    const locationInfo = await GeoLocationService.getLocationFromIp(ip);

    await connection.execute(
      `INSERT INTO user_tracking (ip_address, country, city, region, device_type, browser_name, visited_page, time_spent_seconds, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        ip,
        locationInfo.country,
        locationInfo.city,
        locationInfo.region,
        deviceType,
        browserName,
        visitedPage,
        timeSpentSeconds ? parseInt(timeSpentSeconds, 10) : null // Garante que seja número ou null
      ]
    );

    res.status(200).json({ message: 'Tracking data received successfully' });
  } catch (error) {
    console.error('Error saving tracking data:', error);
    res.status(500).json({ error: 'Failed to save tracking data' });
  }
});
// Rota para obter dados de rastreamento detalhados (protegida) (NOVA)
app.get('/api/tracking-data', authMiddleware, async (req, res) => {
  try {
    const connection = await getConnection();
    // Busca os últimos 100 registros, por exemplo. Pode adicionar paginação depois.
    const [trackingData] = await connection.execute(
      'SELECT * FROM user_tracking ORDER BY timestamp DESC LIMIT 100'
    );
    res.json(trackingData);
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
});

// WebSocket para atualizações em tempo real
// WebSocket para atualizações em tempo real
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Autenticação do WebSocket
  socket.on('authenticate', (token) => {
    if (token !== 'CYB3RSH3LL_FOR_CYB3RR4TS') {
      socket.disconnect();
      return;
    }
    socket.isAuthenticated = true;
  });

  // Enviar atualizações de analytics a cada 5 segundos
  const analyticsInterval = setInterval(async () => {
    try {
      const analytics = await AnalyticsService.getAnalytics();
      socket.emit('analytics_update', analytics);
    } catch (error) {
      console.error('Error sending analytics update:', error);
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(analyticsInterval);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});