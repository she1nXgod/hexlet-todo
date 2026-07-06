import cn from 'classnames';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className: string;
} & Omit<ComponentProps<typeof motion.button>, 'type' | 'children' | 'className'>;

const Button = ({ type = 'button', children, className, ...props }: ButtonProps) => {
  return (
    <motion.button
      type={type}
      className={cn('btn', className)}
      {...props}
      whileHover={{
        y: -1.5,
        opacity: 0.6,
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
