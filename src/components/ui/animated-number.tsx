"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
}

/**
 * Animated counter that counts up from 0 to the target value.
 * Uses spring physics for a natural feel and triggers on viewport entry.
 */
export function AnimatedNumber({
  value,
  duration = 1.5,
  formatOptions,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    new Intl.NumberFormat("en-US", formatOptions).format(Math.round(current)),
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

interface AnimatedPercentageProps {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
}

/**
 * Animated percentage that counts up with a % suffix.
 */
export function AnimatedPercentage({
  value,
  duration = 1.5,
  decimals = 0,
  className,
}: AnimatedPercentageProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(
    spring,
    (current) => `${current.toFixed(decimals)}%`,
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

interface AnimatedCurrencyProps {
  value: number;
  currency?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated currency value with symbol and formatting.
 */
export function AnimatedCurrency({
  value,
  currency = "USD",
  duration = 1.5,
  className,
}: AnimatedCurrencyProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(current)),
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
