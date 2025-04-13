import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, ChatBot, CyberSecurity, AdminAuth } from "./components";
import { StarsCanvas } from "./components/canvas";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />
        <div className='relative'>
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
                <Contact />
              </>
            } />
            <Route path="/cyber" element={<CyberSecurity />} />
            <Route path="/cybersecurity" element={<CyberSecurity />} />
            <Route path="/admin" element={<AdminAuth />} />
          </Routes>
          <StarsCanvas />
          <ChatBot />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
