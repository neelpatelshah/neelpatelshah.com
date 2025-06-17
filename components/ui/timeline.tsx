"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll } from "framer-motion";
import React from "react";

export const Timeline = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="absolute left-2 top-0 h-full w-0.5 -translate-x-1/2 bg-muted" />
      <motion.div
        className="absolute left-2 top-0 h-full w-0.5 -translate-x-1/2 origin-top bg-primary"
        style={{ scaleY: scrollYProgress }}
      />
      <div className="ml-8 space-y-12">{children}</div>
    </div>
  );
};

export const TimelineItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className={cn("relative", className)}
    >
      <div className="absolute -left-6 top-3 h-[2px] w-3 -translate-y-1/2 bg-zinc-100" />
      <motion.div
        className="absolute -left-6 top-3 h-[2px] w-3 -translate-y-1/2 bg-primary"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      />
      <div className="py-1">{children}</div>
    </motion.div>
  );
};
