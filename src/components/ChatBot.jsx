import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { GhostBotIcon, UserIcon } from '../assets/chatbot-icons';

const decisionTree = {
  initial: {
    message: 'Olá! Eu sou o Ghost in the Machine, o assistente virtual do Ilan. Como posso ajudar você hoje?',
    options: [
      { text: 'Qual é a experiência profissional do Ilan?', next: 'experience' },
      { text: 'Quais são as principais habilidades técnicas dele?', next: 'skills' },
      { text: 'Me fale sobre os projetos que ele desenvolveu', next: 'projects' },
      { text: 'Qual é a formação acadêmica dele?', next: 'education' }
    ]
  },
  experience: {
    message: 'Atualmente, Ilan trabalha como Analista de Dados Junior no Grupo Casas Bahia, onde desenvolve e mantém dashboards no Power BI, além de implementar soluções de automação. Anteriormente, ele trabalhou como Desenvolvedor Web React em projetos para a Forchela Arte & Ferro e Portas de Aço Verona, onde criou sites institucionais e implementou soluções responsivas.',
    options: [
      { text: 'Quais tecnologias ele usa no trabalho atual?', next: 'current_tech' },
      { text: 'Me conte mais sobre os projetos anteriores', next: 'past_projects' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  skills: {
    message: 'Ilan é um desenvolvedor Full Stack com forte experiência em: HTML5 (99%), CSS3 (99%), JavaScript (85%), Git (85%), Node.js (70%), TypeScript (70%), React.js (75%), Python (60%), e Tailwind CSS (65%). Ele também tem conhecimentos em Three.js, Redux e Figma.',
    options: [
      { text: 'Como ele aplica essas habilidades?', next: 'skills_application' },
      { text: 'Quais são seus diferenciais técnicos?', next: 'tech_highlights' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  projects: {
    message: 'Alguns projetos destacados incluem: Trendy App (aplicativo mobile em React Native para tendências em redes sociais), Site Forchela (plataforma institucional com React e Django), e Site Verona (aplicação web com React e otimização SEO). Todos esses projetos estão disponíveis no GitHub dele.',
    options: [
      { text: 'Detalhes sobre o Trendy App', next: 'trendy_details' },
      { text: 'Fale mais sobre os sites institucionais', next: 'websites_details' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  education: {
    message: 'Ilan tem formação técnica em Desenvolvimento de Sistemas e está constantemente se atualizando através de cursos e projetos práticos. Ele possui certificações em diversas tecnologias e mantém um forte compromisso com aprendizado contínuo.',
    options: [
      { text: 'Quais certificações ele possui?', next: 'certifications' },
      { text: 'Como ele se mantém atualizado?', next: 'learning' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  current_tech: {
    message: 'No Grupo Casas Bahia, Ilan trabalha principalmente com Power BI para análise de dados, Python para automação de processos, e APIs para integrações. Ele aplica práticas de DataOps e utiliza ferramentas de versionamento como Git.',
    options: [
      { text: 'Voltar à experiência', next: 'experience' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  past_projects: {
    message: 'Na Forchela Arte & Ferro, ele desenvolveu um site institucional usando React e Django, implementando um sistema de orçamentos e banco de dados PostgreSQL. Na Verona Portas de Aço, criou um site responsivo com React, focando em SEO e integração com Google Tag Manager.',
    options: [
      { text: 'Voltar à experiência', next: 'experience' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  skills_application: {
    message: 'Ilan aplica suas habilidades em projetos full stack, desde o desenvolvimento frontend com React até a implementação de backends robustos com Node.js e Python. Ele tem experiência particular em criar interfaces responsivas e otimizar performance de aplicações.',
    options: [
      { text: 'Voltar às habilidades', next: 'skills' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  tech_highlights: {
    message: 'Os diferenciais técnicos do Ilan incluem sua experiência com Three.js para visualizações 3D, conhecimento em práticas de SEO, e habilidade em combinar análise de dados com desenvolvimento web. Ele também tem experiência em desenvolvimento mobile com React Native.',
    options: [
      { text: 'Voltar às habilidades', next: 'skills' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  trendy_details: {
    message: 'O Trendy App é um aplicativo mobile desenvolvido em React Native que apresenta tendências atuais em redes sociais sobre diversos temas como vídeos, filmes, animes, livros e música. O app utiliza Node.js no backend e integra com diversas APIs para coletar dados em tempo real.',
    options: [
      { text: 'Voltar aos projetos', next: 'projects' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  websites_details: {
    message: 'Os sites institucionais desenvolvidos por Ilan demonstram sua capacidade de criar soluções completas. O site da Forchela inclui um sistema de orçamentos integrado com Django e PostgreSQL, enquanto o site da Verona foi otimizado para SEO e possui integração com ferramentas de analytics.',
    options: [
      { text: 'Voltar aos projetos', next: 'projects' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  certifications: {
    message: 'Ilan possui certificações em React, Python, e análise de dados. Ele também tem certificados em tecnologias específicas como Three.js e ferramentas de desenvolvimento web moderno.',
    options: [
      { text: 'Voltar à educação', next: 'education' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  },
  learning: {
    message: 'Ilan mantém-se atualizado através de projetos práticos, contribuições open source, e participação em comunidades de desenvolvimento. Ele regularmente explora novas tecnologias e aplica seu aprendizado em projetos pessoais.',
    options: [
      { text: 'Voltar à educação', next: 'education' },
      { text: 'Voltar ao início', next: 'initial' }
    ]
  }
};

const ChatBot = () => {
  const [currentState, setCurrentState] = useState('initial');
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (next) => {
    const currentNode = decisionTree[currentState];
    setChatHistory([...chatHistory, 
      { type: 'bot', message: currentNode.message },
      { type: 'user', message: next }
    ]);
    setCurrentState(next);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8"
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-tertiary p-3 rounded-full hover:bg-secondary transition-colors relative group"
        >
          <GhostBotIcon />
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full right-0 mb-2 bg-tertiary p-3 rounded-lg shadow-xl w-64 text-white text-sm"
              >
                <div className="relative">
                  <div className="absolute -bottom-2 right-4 w-4 h-4 bg-tertiary transform rotate-45"></div>
                  <p>Olá! Sou o Ghost in the Machine, seu guia espectral. Posso ajudar você a conhecer melhor o Ilan?</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/90 backdrop-blur-sm p-4 rounded-lg shadow-xl w-[95vw] sm:w-[400px] max-h-[80vh] sm:max-h-[600px] flex flex-col border border-tertiary/30 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4 p-2 bg-black/30 rounded-lg">
            <div className="flex items-center gap-2">
              <GhostBotIcon />
              <h3 className="text-[14px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ghost in the Machine
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-secondary hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-tertiary scrollbar-track-transparent hover:scrollbar-thumb-secondary transition-colors">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${chat.type === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {chat.type === 'bot' ? <GhostBotIcon /> : <UserIcon />}
                <div
                  className={`${chat.type === 'bot' ? 'bg-tertiary/70' : 'bg-secondary/70'} 
                    p-3 rounded-lg backdrop-blur-sm border border-white/10 flex-1 
                    ${chat.type === 'bot' ? 'rounded-tl-none' : 'rounded-tr-none'}
                    hover:shadow-lg transition-all duration-300 hover:border-white/20`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            <div className="flex items-start gap-2">
              <GhostBotIcon />
              <div className="bg-tertiary/70 p-3 rounded-lg backdrop-blur-sm border border-white/10 flex-1 rounded-tl-none">
                {decisionTree[currentState].message}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {decisionTree[currentState].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.next)}
                className="w-full p-2 text-left bg-secondary/70 hover:bg-tertiary/70 rounded-lg transition-all backdrop-blur-sm border border-white/10 hover:scale-[1.02] hover:shadow-lg"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatBot;