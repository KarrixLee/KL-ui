import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Latest updates and improvements to KL UI.",
  keywords: [
    "KL UI",
    "Changelog",
    "Updates",
    "Improvements",
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

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: "v0.1.0 - beta",
    date: "17 Feb 2025",
    title: "Initial beta release",
    changes: ["Added Info Card component", "Added Unsave Popup component"],
  },
];

function VersionEntry({ version, date, title, changes }: ChangelogEntry) {
  return (
    <div className="relative border-l-2 border-muted pl-6 pb-10">
      <div className="absolute -left-[9px] top-[22px] h-4 w-4 rounded-full border-2 border-background bg-muted-foreground" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">{version}</h2>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            {date}
          </span>
        </div>
        <div className="text-muted-foreground space-y-4 text-sm">
          <p>{title}</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            {changes.map((change, index) => (
              <li key={index}>{change}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl md:text-3xl font-medium">
          Changelog
        </h1>
        <p className="text-muted-foreground/90">
          Latest updates and improvements to KL UI.
        </p>
      </div>

      <div>
        {changelogData.map((entry, index) => (
          <VersionEntry key={index} {...entry} />
        ))}
      </div>
    </div>
  );
}
