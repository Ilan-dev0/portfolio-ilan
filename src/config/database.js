import { createConnection } from 'mysql2/promise';

const dbConfig = {
  host: process.env.VITE_DB_HOST,
  port: process.env.VITE_DB_PORT,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: process.env.VITE_DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  connectTimeout: 20000,
  ssl: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  socketPath: null,
  acquireTimeout: 30000,
  timezone: '+00:00'
};

const createTables = async (connection) => {
  // Tabela de visitantes únicos
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ip VARCHAR(45) NOT NULL,
      first_visit DATETIME NOT NULL,
      last_visit DATETIME NOT NULL,
      total_visits INT DEFAULT 1,
      UNIQUE KEY unique_ip (ip)
    )
  `);

  // Tabela de logs de acesso
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS access_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ip VARCHAR(45) NOT NULL,
      city VARCHAR(100),
      region VARCHAR(100),
      country VARCHAR(100),
      timestamp DATETIME NOT NULL,
      INDEX idx_timestamp (timestamp)
    )
  `);

  // Tabela de sessões ativas
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS active_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_id VARCHAR(255) NOT NULL,
      ip VARCHAR(45) NOT NULL,
      last_activity DATETIME NOT NULL,
      UNIQUE KEY unique_session (session_id),
      INDEX idx_last_activity (last_activity)
    )
  `);
};

let connection = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY = 3000;

export const getConnection = async () => {
  if (!connection) {
    try {
      connection = await createConnection(dbConfig);
      connection.on('error', handleConnectionError);
      await createTables(connection);
      reconnectAttempts = 0;
    } catch (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        console.log(`Tentativa de reconexão ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
        await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY));
        return getConnection();
      }
      throw new Error('Não foi possível estabelecer conexão com o banco de dados após várias tentativas');
    }
  }
  return connection;
};

const handleConnectionError = async (err) => {
  console.error('Erro de conexão com o banco de dados:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
    connection = null;
    await getConnection();
  }
};

export const closeConnection = async () => {
  if (connection) {
    await connection.end();
    connection = null;
  }
};