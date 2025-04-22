import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; // Adiciona Outlet

import { About, Contact, Experience, Hero, Navbar, Tech, Works, ChatBot, CyberSecurity, AdminAuth } from "./components"; // Removi Feedbacks se não estiver sendo usado
import { StarsCanvas } from "./components/canvas";
import usePageTracking from "./hooks/usePageTracking"; // Importa o hook

// Componente de Layout Principal
const MainLayout = () => {
  usePageTracking(); // Usa o hook no layout que envolve as páginas rastreadas
  return (
    <div className='relative z-0 bg-primary'>
      {/* Navbar e fundo ficam fora do Outlet para persistir */}
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        {/* Hero pode ser movido para a rota '/' se for exclusivo da home */}
      </div>
      {/* Outlet renderiza o conteúdo específico da rota */}
      <Outlet />
      {/* Componentes que devem aparecer em todas as páginas do layout */}
      <ChatBot />
    </div>
  );
};

// Componente para a página inicial agrupando seções
const HomePage = () => (
  <>
    <Hero /> {/* Hero agora faz parte da HomePage */}
    <About />
    <Experience />
    <Tech />
    <Works />
    <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
    </div>
    
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que usam o MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* Rota da página inicial */}
          <Route path="cyber" element={<CyberSecurity />} />
          <Route path="cybersecurity" element={<CyberSecurity />} />
          {/* Adicione outras rotas que devem usar o MainLayout aqui */}
        </Route>

        {/* Rota de Admin (pode ter layout diferente ou nenhum) */}
        <Route path="/admin" element={<AdminAuth />} />

        {/* Adicione outras rotas de nível superior aqui, se necessário */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
