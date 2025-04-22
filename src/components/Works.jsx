import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, shouldReduceMotion } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  // Usa o hook useReducedMotion para verificar preferências do usuário
  const prefersReducedMotion = useReducedMotion();
  
  // Calcula um atraso menor para melhorar a performance
  const delay = prefersReducedMotion ? 0 : Math.min(index * 0.2, 0.5);
  
  // Estado para controlar o carregamento da imagem
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div
      variants={fadeIn("up", "spring", delay, 0.5)}
      className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      whileInView="show"
      viewport={{ once: true, margin: "-30px" }}
      initial="hidden"
    >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className={`w-full h-full object-cover rounded-2xl ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s' }}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
    </motion.div>
  );
};

const Works = () => {
  // Estado para controlar o carregamento progressivo dos projetos
  const [visibleProjects, setVisibleProjects] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  // Carrega os projetos progressivamente para melhorar a performance
  useEffect(() => {
    if (prefersReducedMotion) {
      // Se o usuário prefere movimento reduzido, carrega todos de uma vez
      setVisibleProjects(projects);
      return;
    }
    
    // Carrega os projetos gradualmente
    const loadProjects = () => {
      projects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => 
            prev.length <= index ? [...projects.slice(0, index + 1)] : prev
          );
        }, index * 150);
      });
    };
    
    loadProjects();
  }, [prefersReducedMotion]);

  return (
    <>
      <motion.div 
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={`${styles.sectionSubText} `}>Meu trabalho</p>
        <h2 className={`${styles.sectionHeadText}`}>Projetos.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Os projetos a seguir destacam minhas habilidades e experiência por meio de exemplos do mundo real do meu trabalho. Cada projeto é brevemente descrito, contendo links para repositórios de código e demos ao vivo. Eles refletem minha capacidade de resolver problemas complexos, trabalhar com diversas tecnologias e gerenciar projetos de forma eficaz.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {visibleProjects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
