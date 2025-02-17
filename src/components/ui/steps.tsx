"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}

export function Step({
  step,
  title,
  description,
  children,
  isCompleted,
  isActive,
  onClick,
}: StepProps) {
  return (
    <div className="group relative" onClick={onClick}>
      <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 rounded-full border bg-background p-1">
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200",
            isCompleted ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {isCompleted ? (
            <Check className="h-3 w-3" />
          ) : (
            <span className="text-xs">{step}</span>
          )}
        </div>
      </div>
      <div
        className={cn(
          "p-6 ml-5 rounded-lg border bg-card transition-all duration-200",
          isActive && "border-primary/50",
          !isActive && "cursor-pointer hover:border-primary/20 opacity-50"
        )}
      >
        <div className="space-y-1">
          <h3 className="font-medium leading-none">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.2,
                  },
                  opacity: {
                    duration: 0.15,
                    delay: 0.05,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.2,
                  },
                  opacity: {
                    duration: 0.1,
                  },
                },
              }}
              className="overflow-hidden"
            >
              <div className="pt-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div
      className={cn(
        "relative ml-6 space-y-4 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-border",
        className
      )}
    >
      {children}
    </div>
  );
}
