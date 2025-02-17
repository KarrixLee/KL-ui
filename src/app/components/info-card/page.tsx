import { InfoCardDemo } from "@/components/demo-ui/info-card/demo";
import {
  InfoCardDemoCode,
  infoCardStructureCode,
} from "@/components/demo-ui/info-card/code";
import { InfoCardInstallationCode } from "@/components/demo-ui/info-card/installation";
import { NavigationMenu } from "@/components/navigation-menu";
import { Info } from "lucide-react";
import { PropTable, PropDefinition } from "@/components/ui/prop-table";
import { codeToHtml } from "shiki";
import { CodeBlock } from "@/components/ui/code-block";
import { Metadata } from "next";
import { OpenInV0Button } from "@/components/open-in-v0";

const infoCardProps: PropDefinition[] = [
  {
    prop: "storageKey",
    type: "string",
    description:
      "Required when using dismissType='forever'. Used to store the dismissed state in localStorage.",
  },
  {
    prop: "dismissType",
    type: "'once' | 'forever'",
    default: "'once'",
    description:
      "Controls whether the card should be dismissed temporarily or permanently using localStorage.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The content of the card.",
  },
];

const mediaProps: PropDefinition[] = [
  {
    prop: "media",
    type: "MediaItem[]",
    description:
      "Array of media items to display. Each item can be an image or video. At most 3 items are supported.",
  },
  {
    prop: "shrinkHeight",
    type: "number",
    default: "75",
    description: "Height of the media container when not hovered (in pixels).",
  },
  {
    prop: "expandHeight",
    type: "number",
    default: "150",
    description: "Height of the media container when hovered (in pixels).",
  },
  {
    prop: "loading",
    type: "'eager' | 'lazy'",
    description: "Controls the loading behavior of images.",
  },
];

const mediaItemProps: PropDefinition[] = [
  {
    prop: "type",
    type: "'image' | 'video'",
    default: "'image'",
    description: "The type of media to display.",
  },
  {
    prop: "src",
    type: "string",
    description: "The URL of the media resource.",
  },
  {
    prop: "alt",
    type: "string",
    description: "Alt text for images (accessibility).",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the media element.",
  },
  {
    prop: "props",
    type: "React.HTMLAttributes<HTMLDivElement>",
    description: "Additional props to pass to the media element.",
  },
];

export const metadata: Metadata = {
  title: "Info Card",
  description:
    "A versatile information card component for displaying content in an organized and visually appealing way.",
  keywords: [
    "React",
    "Next.js",
    "Shadcn UI",
    "NextUI",
    "Info Card",
    "Card",
    "KL UI",
    "Component Library",
    "Motion",
    "Framer Motion",
  ],
};

// Make the page component async
export default async function InfoCardPage() {
  const codeComponent = await InfoCardDemoCode();
  const structureCode = await codeToHtml(infoCardStructureCode, {
    lang: "tsx",
    theme: "min-dark",
  });

  return (
    <div className="relative flex flex-row">
      <div className="flex-1 space-y-10">
        {/* title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl">Information Card</h1>
          <span className="text-sm md:text-base text-muted-foreground/90 leading-[22px]">
            Information cards can serve as callout cards, banners, toast
            notifications, or announcement boxes to deliver news, updates, and
            alerts to your users.
          </span>
          {/* Quote block */}
          <div className="border-l-2 border-l-gray-200 bg-gradient-to-r from-muted/50 to-transparent p-4 flex items-center gap-4">
            <Info className="w-4 h-4" />
            <blockquote className="space-y-2">
              <p className="text-sm leading-6">
                It works especially well in sidebars, but you can use it
                anywhere too!
              </p>
            </blockquote>
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-2 mx-2">
            <h2 className="text-lg font-medium" id="playground">
              Playground
            </h2>
            <OpenInV0Button url="https://karrix.dev/r/info-card-demo" />
          </div>
          <InfoCardDemo initialCodeHtml={codeComponent} />
        </div>

        <div className="flex justify-center border-t border-gray-200 w-40 mx-auto" />

        {/* Installation */}
        <div className="flex flex-col gap-4">
          <h2 className="ml-2 text-lg font-medium" id="installation">
            Installation
          </h2>
          <InfoCardInstallationCode />
        </div>

        <div className="flex justify-center border-t border-gray-200 w-40 mx-auto" />

        {/* Props and Usage */}
        <div className="flex flex-col gap-4">
          <h2 className="ml-2 text-lg font-medium" id="props">
            Props and Usage
          </h2>

          {/* Basic usage example */}
          <div className="space-y-4">
            <div className="md:p-4">
              <CodeBlock
                html={structureCode}
                maxHeight={300}
                expandedHeight={500}
              />
            </div>

            {/* Props tables */}
            <div className="grid gap-6">
              <PropTable title="<InfoCard />" props={infoCardProps} />

              <PropTable title="<InfoCardMedia />" props={mediaProps} />

              <PropTable title="MediaItem" props={mediaItemProps} />
            </div>
          </div>
        </div>
      </div>

      {/* Right-side navigation */}
      <div className="sticky top-24 h-fit ml-4">
        <NavigationMenu />
      </div>
    </div>
  );
}
