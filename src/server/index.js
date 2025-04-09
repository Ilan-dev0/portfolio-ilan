import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { AnalyticsService } from '../services/analyticsService.js';
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

// Middleware para verificar conexão com banco de dados
app.use(async (req, res, next) => {
  try {
    const connection = await getConnection();
    if (!connection) {
      throw new Error('Database connection failed');
    }
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