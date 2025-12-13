"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Container variants for orchestrating children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Item variants for individual children
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

/**
 * Wraps page content with a fade-in animation.
 * Use AnimatedPageStagger for staggered children animations.
 * 
 * Uses pathname as key to ensure animations retrigger on navigation.
 */
export function AnimatedPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  return (
    <motion.div
      key={pathname} // Key based on route ensures remount and animation retrigger
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that staggers the entrance of direct children.
 * Each child gets a subtle slide-up + fade-in animation.
 *
 * @example
 * ```tsx
 * <AnimatedPageStagger>
 *   <h1>Title</h1>
 *   <Card>Content 1</Card>
 *   <Card>Content 2</Card>
 * </AnimatedPageStagger>
 * ```
 * 
 * Uses pathname as key to ensure animations retrigger on navigation.
 */
export function AnimatedPageStagger({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();
  
  return (
    <motion.div
      key={pathname} // Key based on route ensures remount and animation retrigger
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrapper for items inside AnimatedPageStagger.
 * Automatically picks up the stagger timing from parent.
 */
export function AnimatedItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * A single animated element that fades/slides in when it enters the viewport.
 * Great for lazy-loading sections or infinite scroll items.
 */
export function AnimatedOnView({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
