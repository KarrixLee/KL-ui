import { PackageManagerTabs } from "@/components/ui/package-manager-tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation",
  description: "How to install dependencies and structure your app.",
  keywords: [
    "React",
    "Next.js",
    "Shadcn UI",
    "NextUI",
    "Installation",
    "KL UI",
    "Component Library",
    "Motion",
    "Framer Motion",
  ],
};

export default function Installation() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl">Installation</h1>
        <span className="text-sm md:text-base text-muted-foreground/90 leading-[22px]">
          How to install dependencies and structure your app.
        </span>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Prerequisites</h2>
        <div className="grid gap-6">
          {/* Shadcn Installation */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6 pb-3">
              <div className="space-y-1">
                <h3 className="font-medium leading-none">Shadcn UI</h3>
                <p className="text-sm text-muted-foreground">
                  Install Shadcn UI CLI to add components
                </p>
              </div>
              <Link href="https://ui.shadcn.com/docs/cli" target="_blank">
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="hidden md:block text-sm">Documentation</span>{" "}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="p-6 pt-3">
              <PackageManagerTabs
                command="shadcn@latest init"
                variant="dlx"
                className="[&_button]:h-8 [&_pre]:!py-3"
                layoutId="shadcn-init"
              />
            </div>
          </div>

          {/* Motion Installation */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6 pb-3">
              <div className="space-y-1">
                <h3 className="font-medium leading-none">Motion</h3>
                <p className="text-sm text-muted-foreground">
                  Install Motion for animations
                </p>
              </div>
              <Link href="https://www.framer.com/motion/" target="_blank">
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="hidden md:block text-sm">Documentation</span>{" "}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="p-6 pt-3">
              <PackageManagerTabs
                command="motion"
                variant="add"
                className="[&_button]:h-8 [&_pre]:!py-3"
                layoutId="motion-add"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-zinc-300">
        ... And you are good to go!
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Next Steps</h2>
        <div className="rounded-lg border bg-card text-card-foreground">
          <div className="p-6">
            <Link
              href="/components/info-card"
              className="group flex items-center justify-between"
            >
              <div className="space-y-1">
                <h3 className="font-medium leading-none">
                  Check out the components
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to use the components in your project
                </p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
