"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PropDefinition {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

interface PropTableProps {
  title: string;
  props: PropDefinition[];
  className?: string;
}

export function PropTable({ title, props, className }: PropTableProps) {
  const [showAllProps, setShowAllProps] = useState(true);

  return (
    <div className={cn("rounded-lg border", className)}>
      <div
        className="border-b bg-muted/50 px-4 py-3 cursor-pointer"
        onClick={() => setShowAllProps((prev) => !prev)}
      >
        <h3 className="font-mono text-sm font-semibold">{title}</h3>
      </div>
      <AnimatePresence>
        {showAllProps && (
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 gap-5 p-4">
              {props.map((prop) => (
                <div key={prop.prop} className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {prop.prop}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </span>
                  </div>
                  {prop.default && (
                    <div className="text-xs text-muted-foreground">
                      Default: {prop.default}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground tracking-normal">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
