import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminAuth from './AdminAuth';

import { technologies } from '../constants';
import { FaShieldAlt, FaBug, FaLock, FaUserSecret, FaTools, FaArrowLeft } from 'react-icons/fa';
// Primeira pista - Base64
window.stage1_hint = "Q1lCM1JTSDNMTCBGb3IgQ3liM3JSNFRz";

import { SiWireshark, SiMetasploit, SiBurpsuite } from 'react-icons/si';

// Segunda pista - ROT13
window.stage2_hint = "Gur frperg vf va gur pbqr";

// Terceira pista - Hexadecimal
window.stage3_hint = "436F6E67726174732120546865206B657920697320435942335253483354535F464F525F4359423352523454532E";

// Dica para começar: console.log(stage1_hint)

const NeonSkillBar = ({ label, value, icon: Icon, description }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    const startAnimation = async () => {
      while (isMounted && isAnimating) {
        await controls.start({
          boxShadow: '0 0 8px 2px #ff3864',
          opacity: 1,
          transition: { duration: 0.4, ease: 'linear' },
        });
        await controls.start({
          boxShadow: '0 0 10px 5px #ff3864',
          opacity: 0.8,
          transition: { duration: 0.4, ease: 'linear' },
        });
        await controls.start({
          boxShadow: '0 0 0 0 #ff3864',
          opacity: 1,
          transition: { duration: 0.4, ease: 'linear' },
        });
      }
    };

    startAnimation();
    return () => {
      isMounted = false;
      setIsAnimating(false);
    };
  }, [controls, isAnimating]);

  return (
    <div className="w-full mb-6 p-4 bg-black/30 rounded-lg border border-secondary/30 hover:border-secondary/50 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="text-2xl text-blue-400" />
        <div>
          <span className="font-bold text-white block">{label}</span>
          <span className="text-sm text-gray-400">{description}</span>
        </div>
      </div>
      <div className="relative h-6 bg-black/50 rounded overflow-hidden">
        <motion.div
          className="h-full rounded bg-gradient-to-r from-blue-600 via-purple-500 to-red-400"
          style={{ width: `${value}%` }}
          animate={controls}
        />
        <span className="absolute inset-0 flex items-center justify-end pr-2 text-white font-bold">
          {value}%
        </span>
      </div>
    </div>
  );
};

// Dica oculta nos valores: Soma os valores em hexadecimal
const skills = [
  { label: 'SQL Injection', value: 79, icon: FaBug, description: 'Identificação e prevenção de injeções SQL' }, // 43 em hex
  { label: 'XSS (Cross-Site Scripting)', value: 69, icon: FaShieldAlt, description: 'Proteção contra ataques XSS' }, // 59 em hex
  { label: 'CSRF Protection', value: 51, icon: FaLock, description: 'Implementação de tokens CSRF' }, // 33 em hex
  { label: 'Social Engineering', value: 82, icon: FaUserSecret, description: 'Análise de técnicas de engenharia social' } // 52 em hex
];

// ASCII: 83 72 51 76 76
const tools = [
  { label: 'Metasploit', value: 20, icon: SiMetasploit, description: 'Framework para testes de penetração' }, // Morse: ..-. --- .-.
  { label: 'Burp Suite', value: 49, icon: SiBurpsuite, description: 'Análise de segurança web' }, // Morse: .-. ....- - ...
  { label: 'Wireshark', value: 32, icon: SiWireshark, description: 'Análise de tráfego de rede' }, // Binary: 01010010
  { label: 'Custom Tools', value: 83, icon: FaTools, description: 'Desenvolvimento de ferramentas próprias' } // Hidden key in values
];

// Vigenère: Pbqr vf gur xrl gb gur qnex

const CyberSecurity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWarning, setShowWarning] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  useEffect(() => {
    const hasAccepted = localStorage.getItem('cyber_terms_accepted');
    if (hasAccepted === 'true') {
      setAccepted(true);
      setShowWarning(false);
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setShowWarning(false);
    localStorage.setItem('cyber_terms_accepted', 'true');
  };

  const handleDecline = () => {
    window.history.back();
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authPassword === 'CYB3RSH3LL_FOR_CYB3RR4TS') {
      localStorage.setItem('admin_token', 'CYB3RSH3LL_FOR_CYB3RR4TS');
      setShowAuthModal(false);
      navigate('/admin');
    } else {
      setAuthError('Token inválido');
    }
  };

  const handleAdminClick = () => {
    setShowAuthModal(true);
  };

  const isAdminPage = location.pathname.includes('admin');

  if (isAdminPage) {
    return (
      <div className="min-h-screen pt-24">
        <div className="flex justify-start mb-8 px-8">
          <button
            onClick={() => navigate('/cybersecurity')}
            className="py-3 px-6 bg-blue-600/20 hover:bg-blue-500/30 rounded-lg transition-colors text-white/70 hover:text-white/90 flex items-center gap-2"
          >
            <FaArrowLeft className="text-xl" /> Voltar para Cybersecurity
          </button>
        </div>
        <AdminAuth />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showWarning && !isAdminPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-tertiary p-8 rounded-xl max-w-md mx-4 border border-secondary/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aviso de Segurança
              </h3>
              <p className="text-white/90 mb-6 text-center">
                Você está entrando em uma área dedicada a segurança cibernética, você concorda em participar de minigames interativos e features que podem expor vulnerabilidades?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-green-600/80 hover:bg-green-500 rounded-lg transition-colors"
                >
                  Aceitar
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-2 bg-red-600/80 hover:bg-red-500 rounded-lg transition-colors"
                >
                  Recusar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo principal da página de cybersecurity */}
      {accepted && !isAdminPage && (
        <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
          <div className="flex justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="py-3 px-6 bg-blue-600/20 hover:bg-blue-500/30 rounded-lg transition-colors text-white/70 hover:text-white/90 flex items-center gap-2"
            >
              <FaArrowLeft className="text-xl" /> Voltar para Home
            </button>
            <button
              onClick={handleAdminClick}
              className="py-3 px-6 bg-red-600/20 hover:bg-red-500/30 rounded-lg transition-colors text-white/70 hover:text-white/90 flex items-center gap-2"
            >
              <FaLock className="text-xl" /> Área Administrativa
            </button>
          </div>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Explore o Lado Obscuro</p>
            <h2 className={styles.sectionHeadText}>Cybersecurity.</h2>
          </motion.div>

          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            Bem-vindo à área de segurança cibernética. Embora eu esteja no início da minha jornada e ainda não possua certificações formais,
            tenho desenvolvido experiência prática através de projetos pessoais e estudos autodidatas. Meu foco tem sido em compreender
            e explorar vulnerabilidades comuns, especialmente em aplicações web e bancos de dados, sempre de forma ética e responsável.
          </motion.p>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeIn("right", "spring", 0.2, 0.75)}
              className="bg-tertiary p-6 rounded-2xl border border-secondary/30"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Vulnerabilidades & Exploits
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <NeonSkillBar
                    key={index}
                    label={skill.label}
                    value={skill.value}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("left", "spring", 0.3, 0.75)}
              className="bg-tertiary p-6 rounded-2xl border border-secondary/30"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ferramentas de Pentest
              </h3>
              <div className="space-y-4">
                {tools.map((tool, index) => (
                  <NeonSkillBar
                    key={index}
                    label={tool.label}
                    value={tool.value}
                    icon={tool.icon}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("right", "spring", 0.4, 0.75)}
              className="bg-tertiary p-6 rounded-2xl border border-secondary/30 md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Frameworks & Tecnologias Atuais
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Desenvolvimento Web</h4>
                  <p className="text-sm text-white/70">React, Node.js, TypeScript</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Big Data</h4>
                  <p className="text-sm text-white/70">Databricks, PySpark, Delta Lake</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Cloud AWS</h4>
                  <p className="text-sm text-white/70">S3, Lambda, EC2, CloudWatch</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-semibold mb-2">DevOps</h4>
                  <p className="text-sm text-white/70">Docker, Git, CI/CD</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("right", "spring", 0.5, 0.75)}
              className="bg-tertiary p-6 rounded-2xl border border-secondary/30 md:col-span-2 mt-8"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                Especialidade em SQL Injection & Segurança de Banco de Dados
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-black/30 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold mb-2 text-red-400">Cenário de Ataque: Vazamento de Dados Corporativos</h4>
                  <p className="text-sm text-white/70 mb-4">Um caso real de como hackers podem comprometer bancos de dados corporativos através de engenharia social e SQL Injection:</p>
                  <ol className="list-decimal list-inside space-y-2 text-white/70 text-sm">
                    <li>Fase de Reconhecimento: Identificação de funcionários-chave através de redes sociais</li>
                    <li>Engenharia Social: Uso de phishing direcionado ou shoulder surfing para obter credenciais</li>
                    <li>Exploração de SQL Injection: Manipulação de queries para acessar dados sensíveis</li>
                    <li>Exfiltração: Transferência dos dados para servidores externos</li>
                    <li>Monetização: Tentativa de venda dos dados em mercados da dark web</li>
                  </ol>
                </div>

                <div className="p-4 bg-black/30 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2 text-green-400">Estratégias de Defesa & Mitigação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2 text-white/90">Prevenção Técnica</h5>
                      <ul className="list-disc list-inside space-y-1 text-white/70 text-sm">
                        <li>Implementação de prepared statements</li>
                        <li>Validação rigorosa de inputs</li>
                        <li>WAF com regras específicas para SQL Injection</li>
                        <li>Monitoramento de queries anômalas</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-white/90">Prevenção Organizacional</h5>
                      <ul className="list-disc list-inside space-y-1 text-white/70 text-sm">
                        <li>Treinamento regular de segurança</li>
                        <li>Política de senhas fortes</li>
                        <li>Autenticação multifator (MFA)</li>
                        <li>Segmentação de rede e dados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/30 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2 text-blue-400">Resposta a Incidentes</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-white/70">Processo estruturado de resposta a tentativas de invasão:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-2 bg-black/20 rounded">
                        <span className="text-blue-400 font-medium">1. Detecção</span>
                        <p className="text-white/70">Monitoramento contínuo e alertas em tempo real</p>
                      </div>
                      <div className="p-2 bg-black/20 rounded">
                        <span className="text-blue-400 font-medium">2. Contenção</span>
                        <p className="text-white/70">Isolamento imediato de sistemas comprometidos</p>
                      </div>
                      <div className="p-2 bg-black/20 rounded">
                        <span className="text-blue-400 font-medium">3. Recuperação</span>
                        <p className="text-white/70">Restauração segura e análise forense</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      )}

      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-tertiary p-8 rounded-xl max-w-md mx-4 border border-secondary/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Access
              </h3>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Token de Acesso</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full p-2 rounded bg-black/30 text-white border border-secondary/30 focus:border-secondary/50 outline-none"
                    placeholder="Digite o token secreto"
                  />
                </div>

                {authError && (
                  <div className="text-red-400 text-sm">{authError}</div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="py-2 px-4 bg-red-600/80 hover:bg-red-500 rounded-lg transition-colors text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600/80 hover:bg-blue-500 rounded-lg transition-colors text-white"
                  >
                    Acessar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CyberSecurity;
