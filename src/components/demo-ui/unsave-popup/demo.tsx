"use client";

import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Code, Copy, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CodeDisplay } from "../info-card/code";
import { UnsavePopupUI } from "@/components/demo-ui/unsave-popup/demo-code";
import { unsavePopupCode } from "./code";

interface TabOption {
  id: "form" | "code";
  label: string;
  icon: React.ReactNode;
}

export function UnsavePopupDemo({
  initialCodeHtml,
}: {
  initialCodeHtml: string;
}) {
  const [selected, setSelected] = useState<"form" | "code">("form");
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isInPlayground, setIsInPlayground] = useState(true);

  const options: TabOption[] = [
    { id: "form", label: "Form", icon: <Play className="w-4 h-4" /> },
    { id: "code", label: "Code", icon: <Code className="w-4 h-4" /> },
  ];

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  const handleCopy = async () => {
    try {
      if (copied) return;

      await navigator.clipboard.writeText(unsavePopupCode);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "playground") {
            setIsInPlayground(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.2 }
    );

    const playground = document.getElementById("playground");
    if (playground) {
      observer.observe(playground);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden h-[500px]">
      <AnimatePresence mode="wait">
        {selected === "code" ? (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <CodeDisplay html={initialCodeHtml} />
          </motion.div>
        ) : (
          <div key={key} className="flex flex-col h-full">
            <UnsavePopupUI />
          </div>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <AnimatePresence>
        {isInPlayground && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col-reverse md:flex-row gap-2 items-end md:items-center">
                <div className="bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-sm p-1 rounded-lg flex items-center gap-1 border border-gray-100/50 shadow-lg">
                  {options.map((option, index) => (
                    <Fragment key={option.id}>
                      {index > 0 && <div className="w-px h-4 bg-gray-100" />}
                      <div className="relative">
                        <Button
                          variant="ghost"
                          className={`text-gray-700 rounded-md px-4 relative ${
                            selected === option.id
                              ? ""
                              : "opacity-50 hover:opacity-100"
                          }`}
                          onClick={() => setSelected(option.id)}
                        >
                          {option.label}
                          {option.id === "code" && <Code className="h-4 w-4" />}
                          {selected === option.id && (
                            <motion.div
                              layoutId="underline"
                              className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-900"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </Fragment>
                  ))}
                </div>

                <div className="flex gap-1 bg-gradient-to-r from-gray-50/95 to-white/95 backdrop-blur-sm p-1 rounded-lg border border-gray-100/50 shadow-lg">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-gray-600 hover:text-gray-900 hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100/80 transition-all duration-200"
                          onClick={handleReload}
                          disabled={selected === "code"}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset demo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="w-px h-4 bg-gray-100 my-auto" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="default"
                          className="bg-gradient-to-b from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white border-0 transition-all duration-200"
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="h-4 w-4" />
                            </motion.div>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copied!" : "Copy code"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
