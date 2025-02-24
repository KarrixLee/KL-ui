import { Metadata } from "next";
import { DarkModeContent } from "@/components/dark-mode-content";

export const metadata: Metadata = {
  title: "Dark Mode",
  description: "Dark mode support for KL UI.",
  keywords: [
    "KL UI",
    "Dark Mode",
    "Dark Theme",
    "Dark Mode Support",
    "Dark Mode Toggle",
    "Releases",
    "Shadcn UI",
    "Motion",
    "Framer Motion",
    "React",
    "Next.js",
    "UI Library",
    "Components",
    "TypeScript",
    "Component Library",
  ],
};

export default function DarkModePage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl md:text-3xl font-medium">
          Dark Mode
        </h1>
        <p className="text-muted-foreground/90">
          Using Dark Mode for the components.
        </p>
      </div>

      {/* Mystery Section */}
      <DarkModeContent />
    </div>
  );
}
