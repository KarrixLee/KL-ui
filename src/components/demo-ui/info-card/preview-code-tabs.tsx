"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  MultiStepContent,
  SidebarDemo,
} from "@/components/demo-ui/info-card/demo";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface TabOption {
  id: "preview" | "code";
  label: string;
}

export function PreviewCodeTabs({
  layoutIdPrefix,
  code,
}: {
  layoutIdPrefix: string;
  code: string;
}) {
  const [selected, setSelected] = useState<TabOption["id"]>("preview");
  const [key, setKey] = useState(0);

  const options: TabOption[] = [
    { id: "preview", label: "Preview" },
    { id: "code", label: "Code" },
  ];

  const refreshComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="relative flex border-b border-gray-100 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-100">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`relative pb-2 text-sm px-4 ${
              selected === option.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80 transition-all duration-300"
            }`}
          >
            {option.label}
            {selected === option.id && (
              <motion.div
                layoutId={`${layoutIdPrefix}-preview-code-tab`}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {selected === "preview" ? (
          <div className="relative border border-gray-200 rounded-lg overflow-hidden h-[500px]">
            <SidebarDemo _key={key}>
              <MultiStepContent />
            </SidebarDemo>
            <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon" onClick={refreshComponent}>
                <RotateCcw />
              </Button>
            </div>
          </div>
        ) : (
          <CodeBlock html={code} maxHeight={300} expandedHeight={500} />
        )}
      </div>
    </div>
  );
}
