import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, shouldReduceMotion } from "../utils/motion";
import { testimonials } from "../constants";

// Hook personalizado para otimizar o carregamento dos depoimentos
const useOptimizedTestimonials = (items) => {
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
        }, index * 120);
      });
    };
    
    loadItems();
  }, [items, prefersReducedMotion]);

  return visibleItems;
};

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => {
  // Usa o hook useReducedMotion para verificar preferências do usuário
  const prefersReducedMotion = useReducedMotion();
  
  // Calcula um atraso menor para melhorar a performance
  const delay = prefersReducedMotion ? 0 : Math.min(index * 0.2, 0.5);
  
  // Estado para controlar o carregamento da imagem
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
  <motion.div
    variants={fadeIn("", "spring", delay, 0.5)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
    whileInView="show"
    viewport={{ once: true, margin: "-30px" }}
    initial="hidden"
  >
    <p className='text-white font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className={`w-10 h-10 rounded-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.3s' }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  </motion.div>
  );
};

const Feedbacks = () => {
  // Usa o hook personalizado para otimizar o carregamento
  const visibleTestimonials = useOptimizedTestimonials(testimonials);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div 
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {visibleTestimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
