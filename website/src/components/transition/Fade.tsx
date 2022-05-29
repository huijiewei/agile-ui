import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Fade = ({
  children,
  className = '',
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) => {
  return (
    <motion.div
      className={className}
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: duration }}
    >
      {children}
    </motion.div>
  );
};
