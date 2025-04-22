import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useReducedMotion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, shouldReduceMotion } from "../utils/motion";

// Função para otimizar o carregamento dos elementos da timeline
const useOptimizedTimeline = (items) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Se o usuário prefere movimento reduzido, carrega todos de uma vez
      setVisibleItems(items);
      return;
    }
    
    // Carrega os itens gradualmente para melhorar a performance
    const loadItems = () => {
      items.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => 
            prev.length <= index ? [...items.slice(0, index + 1)] : prev
          );
        }, index * 150);
      });
    };
    
    loadItems();
  }, [items, prefersReducedMotion]);

  return visibleItems;
};

const ExperienceCard = ({ experience }) => {
  // Estado para controlar o carregamento da imagem
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#3b1b21",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className={`w-[60%] h-[60%] object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s' }}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  // Usa o hook personalizado para otimizar o carregamento
  const visibleExperiences = useOptimizedTimeline(experiences);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <>
      <motion.div 
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={`${styles.sectionSubText} text-center`}>
          Tudo que tenho feito até agora
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Experiências.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline animate={!prefersReducedMotion}>
          {visibleExperiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
