"use client";

import { useState } from "react";
import { IoIosContact } from "react-icons/io";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/useAuth";

type NavItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  className,
}) => {
  const { scrollYProgress } = useScroll();

  // 👇 Start as visible
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const prev = scrollYProgress.getPrevious();

    if (typeof current === "number" && typeof prev === "number") {
      const direction = current - prev;
      if (current < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const { user } = useAuth();


  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }} // 👈 Start already visible
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-2xl fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-10 py-3 items-center justify-center space-x-10",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={idx}
            href={navItem.link}
            className="relative dark:text-neutral-50 flex items-center space-x-6 text-neutral-600 hover:text-neutral-500 dark:hover:text-neutral-300"
          >
            {navItem.icon && <span className="block sm:hidden">{navItem.icon}</span>}
            <span className="hidden sm:block text-base font-medium">{navItem.name}</span>
          </a>
        ))}
        { !user ? ( <>
               <button
         onClick={() => window.location.href = "/login"}
        className="relative px-6 py-3 text-base font-medium border rounded-full bg-cyan-500 border-neutral-200 dark:border-white/[0.2] text-black dark:text-white"
         >
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </button>
              
        </> ) : 
        ( <>
        <button
         onClick={() => window.location.href = "/dashboard"}
        className="relative px-6 py-3 text-base font-medium border rounded-full bg-cyan-500 border-neutral-200 dark:border-white/[0.2] text-black dark:text-white"
         >
          <span><IoIosContact /></span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </button>
        </>)

        }
        
      </motion.div>
    </AnimatePresence>
  );
};
