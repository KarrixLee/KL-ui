"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  className?: string;
  layoutId?: string;
}

export function CodeSnippet({ code, className, layoutId }: CodeSnippetProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [code]);

  return (
    <motion.div
      layoutId={layoutId}
      className={cn(
        "relative rounded-lg border bg-primary text-primary-foreground",
        className
      )}
    >
      <pre className="overflow-x-auto p-4 text-sm leading-[1.6rem]">
        <code>{code}</code>
      </pre>

      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-green-400"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-white"
            >
              <Copy className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
