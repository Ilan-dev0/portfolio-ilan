export const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
      willChange: "transform, opacity",
    },
    show: {
      y: 0,
      opacity: 1,
      willChange: "transform, opacity",
      transition: {
        type: "spring",
        duration: 0.8,
        delay: delay || 0,
        stiffness: 100,
        damping: 20,
      },
    },
  };
};

export const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      opacity: 0,
      willChange: "transform, opacity",
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      willChange: "transform, opacity",
      transition: {
        type: type || "tween",
        delay: delay || 0,
        duration: duration || 0.5,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay, duration) => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
      willChange: "transform, opacity",
    },
    show: {
      scale: 1,
      opacity: 1,
      willChange: "transform, opacity",
      transition: {
        type: "tween",
        delay: delay || 0,
        duration: duration || 0.5,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-50%" : direction === "right" ? "50%" : 0,
      y: direction === "up" ? "50%" : direction === "down" ? "50%" : 0,
      willChange: "transform",
    },
    show: {
      x: 0,
      y: 0,
      willChange: "transform",
      transition: {
        type: type || "tween",
        delay: delay || 0,
        duration: duration || 0.5,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren || 0.1,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

// Função utilitária para reduzir a carga de animação em dispositivos de baixo desempenho
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};
