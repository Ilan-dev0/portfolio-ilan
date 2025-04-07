import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, ChatBot, CyberSecurity, AdminAuth } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Hero />
              </div>
              <About />
              <Experience />
              <Tech />
              <Works />
              <div className='relative z-0'>
                <Contact />
                <StarsCanvas />
              </div>
            </>
          } />
          <Route path="/cybersecurity" element={<CyberSecurity />} />
          <Route path="/admin" element={<AdminAuth />} />
        </Routes>
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}

export default App;
