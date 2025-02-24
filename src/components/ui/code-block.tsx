"use client";

import { Button } from "./button";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

interface CodeBlockProps {
  html: string;
  className?: string;
  maxHeight?: number;
  expandedHeight?: number;
}

export function CodeBlock({
  html,
  className,
  maxHeight,
  expandedHeight,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    // Extract text content from HTML string
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const showExpandButton = maxHeight && expandedHeight;

  return (
    <div className={cn("relative group", className)}>
      {/* Copy button */}
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-white"
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

      {/* Code content */}
      <motion.div
        initial={showExpandButton ? { height: maxHeight } : false}
        animate={
          showExpandButton
            ? { height: isExpanded ? expandedHeight : maxHeight }
            : false
        }
        transition={{ duration: 0.2 }}
        className="relative rounded-lg overflow-hidden dark:border dark:border-zinc-700"
      >
        <ScrollArea
          className={cn(
            "h-full",
            showExpandButton
              ? isExpanded
                ? "overflow-auto"
                : "pointer-events-none"
              : "overflow-auto"
          )}
        >
          <div
            className="p-5 text-sm leading-[1.6rem] bg-zinc-900 dark:bg-zinc-950 rounded-lg [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:whitespace-pre-wrap [&>pre]:break-words [&_.line-number]:pr-4 [&_.line-number]:text-zinc-500 [&_.line-number]:border-r [&_.line-number]:border-zinc-700 [&_.line-number]:mr-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ScrollArea>
      </motion.div>
      {/* Gradient overlay */}
      {showExpandButton && (
        <motion.div
          animate={{ opacity: isExpanded ? 0 : 1 }}
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary dark:from-zinc-950 to-transparent pointer-events-none rounded-b-lg"
        />
      )}

      {/* Expand/Collapse button */}
      {showExpandButton && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs gap-1 bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-sm"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
