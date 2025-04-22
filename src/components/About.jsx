import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, shouldReduceMotion } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
  // Usa o hook useReducedMotion para verificar preferências do usuário
  const prefersReducedMotion = useReducedMotion();
  
  // Calcula um atraso menor para melhorar a performance
  const delay = prefersReducedMotion ? 0 : Math.min(index * 0.2, 0.6);
  
  return (
  <motion.div
    variants={fadeIn("right", "spring", delay, 0.5)}
    className='xs:w-[250px] w-full red-brown-gradient p-[1px] rounded-[20px] shadow-card'
    // Adiciona whileInView para melhor controle de animação
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
  >
    <div
      className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
    >
      <img
        src={icon}
        alt='web-development'
        className='w-16 h-16 object-contain'
      />

      <h3 className='text-white text-[20px] font-bold text-center'>
        {title}
      </h3>
    </div>
  </motion.div>
  );
};

const About = () => {
  // Estado para controlar o carregamento progressivo dos serviços
  const [visibleServices, setVisibleServices] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  // Carrega os serviços progressivamente para melhorar a performance
  useEffect(() => {
    if (prefersReducedMotion) {
      // Se o usuário prefere movimento reduzido, carrega todos de uma vez
      setVisibleServices(services);
      return;
    }
    
    // Carrega os serviços gradualmente
    const loadServices = () => {
      services.forEach((_, index) => {
        setTimeout(() => {
          setVisibleServices(prev => 
            prev.length <= index ? [...services.slice(0, index + 1)] : prev
          );
        }, index * 100);
      });
    };
    
    loadServices();
  }, [prefersReducedMotion]);

  return (
    <>
      <motion.div 
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={styles.sectionSubText}>Introdução</p>
        <h2 className={styles.sectionHeadText}>Visão Geral.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Como desenvolvedor de software com experiência substancial em TypeScript e JavaScript,
        adquiri habilidades sólidas na construção de aplicações web modernas. 
        Minha especialização abrange frameworks renomados, incluindo React,
        Node.js e Three.js.
        <br></br>
        <br></br>
        Minha abordagem ágil e proativa na aprendizagem me permite adaptar-me rapidamente
        às mudanças tecnológicas e colaborar eficazmente com os clientes. Tenho um histórico comprovado
        na criação de soluções robustas e amigáveis ao usuário, sempre mantendo um foco claro na resolução de
        problemas do mundo real.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {visibleServices.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
