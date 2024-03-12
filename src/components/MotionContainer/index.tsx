import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const MotionContainer = (props: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {props.children}
    </motion.div>
  );
};
