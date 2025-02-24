import { UnsavePopupDemo } from "@/components/demo-ui/unsave-popup/demo";
import { PropTable, PropDefinition } from "@/components/ui/prop-table";
import { UnsavePopupDemoCode } from "@/components/demo-ui/unsave-popup/code";
import { NavigationMenu } from "@/components/navigation-menu";
import { UnsavePopupInstallationCode } from "@/components/demo-ui/unsave-popup/installation";
import { CodeBlock } from "@/components/ui/code-block";
import { codeToHtml } from "shiki";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import { OpenInV0Button } from "@/components/open-in-v0";

const unsavePopupProps: PropDefinition[] = [
  {
    prop: "show",
    type: "boolean",
    description: "Controls the visibility of the popup",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "The content to be displayed in the popup. Can be plain text for default usage, or compound components for custom usage",
  },
  {
    prop: "onSave",
    type: "() => Promise<void>",
    description:
      "Callback function when save button is clicked (used in default mode)",
  },
  {
    prop: "onReset",
    type: "() => void",
    description:
      "Callback function when reset button is clicked (used in default mode)",
  },
  {
    prop: "shouldBlockFn",
    type: "() => boolean",
    description:
      "Function to determine if the popup should trigger the block animation",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the popup container",
  },
];

const defaultUsageCode = `// Default usage
<UnsavePopup 
  show={hasUnsavedChanges} 
  onSave={handleSave} 
  onReset={handleReset}
>
  You have unsaved changes
</UnsavePopup>`;

const customUsageCode = `// Customized usage with compound components
<UnsavePopup show={hasUnsavedChanges} className="w-full">
  <UnsavePopupDescription>
    🔴 You have unsaved changes
  </UnsavePopupDescription>
  <UnsavePopupDismiss onClick={handleReset}>
    Reset
  </UnsavePopupDismiss>
  <UnsavePopupAction onClick={handleSave}>
    Save Changes
  </UnsavePopupAction>
</UnsavePopup>`;

const descriptionProps: PropDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The content to be displayed in the description area",
  },
];

const actionProps: PropDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The content of the action button",
  },
  {
    prop: "isLoading",
    type: "boolean",
    description: "Controls the loading state of the button",
  },
  {
    prop: "onClick",
    type: "() => Promise<void>",
    description: "Callback function when the action button is clicked",
  },
];

const dismissProps: PropDefinition[] = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The content of the dismiss button",
  },
  {
    prop: "onClick",
    type: "() => void",
    description: "Callback function when the dismiss button is clicked",
  },
];

export const metadata: Metadata = {
  title: "Unsave Popup",
  description:
    "A customizable unsave popup component that helps manage unsaved changes in your forms and applications.",
  keywords: [
    "React",
    "Next.js",
    "Shadcn UI",
    "NextUI",
    "Popup",
    "Unsave",
    "Dialog",
    "KL UI",
    "Component Library",
    "Motion",
    "Framer Motion",
  ],
};

export default async function UnsavePopupPage() {
  const unsavePopupCodeHtml = await UnsavePopupDemoCode();

  const defaultUsageHtml = await codeToHtml(defaultUsageCode, {
    lang: "tsx",
    theme: "min-dark",
  });

  const customUsageHtml = await codeToHtml(customUsageCode, {
    lang: "tsx",
    theme: "min-dark",
  });

  return (
    <div className="relative flex flex-row">
      <div className="flex-1 space-y-10">
        {/* title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl">Unsave Popup</h1>
          <span className="text-sm md:text-base text-muted-foreground/90 leading-[22px]">
            A popup component to confirm before discarding changes. Inspired by
            Discord, it will shake when the user tries to leave without saving.
          </span>
        </div>

        {/* content */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-2 mx-2">
            <h2 className="text-lg font-medium" id="playground">
              Playground
            </h2>
            <OpenInV0Button url="https://karrix.dev/r/unsave-popup-demo" />
          </div>
          <UnsavePopupDemo initialCodeHtml={unsavePopupCodeHtml} />
        </div>

        <div className="flex justify-center border-t border-gray-200 w-40 mx-auto" />

        {/* Installation */}
        <div className="flex flex-col gap-4">
          <h2 className="ml-2 text-lg font-medium" id="installation">
            Installation
          </h2>
          <UnsavePopupInstallationCode />
        </div>

        <div className="flex justify-center border-t border-gray-200 w-40 mx-auto" />

        {/* Usage Examples */}
        <div className="flex flex-col gap-4">
          <h2 className="ml-2 text-lg font-medium" id="props">
            Usage Examples
          </h2>

          {/* Default Usage */}
          <div className="space-y-4 md:p-4">
            <h3 className="ml-2 text-md font-medium">Default Usage</h3>
            <CodeBlock html={defaultUsageHtml} maxHeight={300} />
          </div>

          {/* Notice for compound components */}
          <div className="border-l-2 border-l-yellow-500 bg-gradient-to-r from-yellow-50 dark:from-yellow-950/50 to-transparent p-4 flex items-center gap-4">
            <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />
            <blockquote className="space-y-2">
              <p className="text-sm leading-6 dark:text-yellow-200/90">
                When using compound components:
              </p>
              <ul className="list-disc ml-4 text-sm leading-6 dark:text-yellow-200/90">
                <li>
                  <code className="dark:text-yellow-300">
                    UnsavePopupDescription
                  </code>
                </li>
                <li>
                  <code className="dark:text-yellow-300">
                    UnsavePopupAction
                  </code>
                </li>
                <li>
                  <code className="dark:text-yellow-300">
                    UnsavePopupDismiss
                  </code>
                </li>
              </ul>
              <p className="text-sm leading-6 dark:text-yellow-200/90">
                You must include all three components together. Using them
                individually will throw an error.
              </p>
            </blockquote>
          </div>

          {/* Custom Usage */}
          <div className="space-y-4 md:p-4">
            <h3 className="ml-2 text-md font-medium">Customized Usage</h3>
            <CodeBlock html={customUsageHtml} maxHeight={300} />
          </div>
        </div>

        <div className="flex justify-center border-t border-gray-200 w-40 mx-auto" />

        {/* Props and Usage */}
        <div className="flex flex-col gap-4">
          <h2 className="ml-2 text-lg font-medium" id="props">
            Props
          </h2>
          <PropTable title="<UnsavePopup />" props={unsavePopupProps} />
          <PropTable
            title="<UnsavePopupDescription />"
            props={descriptionProps}
          />
          <PropTable title="<UnsavePopupAction />" props={actionProps} />
          <PropTable title="<UnsavePopupDismiss />" props={dismissProps} />
        </div>
      </div>

      {/* Right-side navigation */}
      <div className="sticky top-24 h-fit lg:ml-4">
        <NavigationMenu />
      </div>
    </div>
  );
}
