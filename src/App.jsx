import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, ChatBot, CyberSecurity, AdminAuth } from "./components";
import { StarsCanvas } from "./components/canvas";

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
          <Route path="/cyber" element={<CyberSecurity />} />
          <Route path="/cybersecurity" element={<CyberSecurity />} />
          <Route path="/admin" element={<AdminAuth />} />
        </Routes>
        <div className='relative z-0'>
          <StarsCanvas />
        </div>
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}

export default App;
