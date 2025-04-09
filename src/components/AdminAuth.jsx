import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import AdminDashboard from './AdminDashboard';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Token secreto escondido no comentário HTML do site
  const SECRET_TOKEN = 'CYB3RSH3LL_FOR_CYB3RR4TS';

  useEffect(() => {
    // Verificar se há um token salvo
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken === SECRET_TOKEN) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_TOKEN) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_token', SECRET_TOKEN);
      setError('');
    } else {
      setError('Token inválido');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="pt-4">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen flex items-center justify-center`}>
      <motion.div
        variants={fadeIn('up', 'spring', 0.3, 0.75)}
        className="bg-tertiary p-8 rounded-2xl border border-secondary/30 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
          Admin Access
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Token de Acesso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-black/30 text-white border border-secondary/30 focus:border-secondary/50 outline-none"
              placeholder="Digite o token secreto"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600/80 hover:bg-blue-500 rounded-lg transition-colors text-white font-semibold"
          >
            Acessar
          </button>

          <div className="text-center text-white/50 text-sm mt-4">
            Dica: Procure pelo token escondido no site
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAuth;