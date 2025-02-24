import { Metadata } from "next";
import { ArrowRight, Coffee, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/tweet-card";
import { HoverCardUser } from "@/components/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "KL UI - Animated UI components with React",
  description:
    "A modern, customizable, and accessible React component library built with best practices and developer experience in mind.",
  keywords: [
    "React",
    "Next.js",
    "Shadcn UI",
    "NextUI",
    "UI Library",
    "Components",
    "TypeScript",
    "Component Library",
    "Motion",
    "Framer Motion",
  ],
  openGraph: {
    images: ["/readme-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/readme-cover.jpg"],
  },
  authors: [{ name: "Karrix Lee", url: "https://github.com/karrixlee" }],
};

export default function Home() {
  return (
    <main className="flex-1 space-y-10 pb-8">
      {/* Hero Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-medium">KL</h1>
          <span className="text-muted-foreground mt-2 md:mt-3 md:text-lg">
            UI
          </span>
        </div>
        <p className="text-muted-foreground max-w-[750px]">
          Animated UI components and effects with love. Build with{" "}
          <span className="font-semibold">shadcn/ui</span> and{" "}
          <span className="font-semibold">Motion</span>.
        </p>
        <div className="flex gap-4 pt-4">
          <Link href="/installation">
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://github.com/karrixlee/KL-UI" target="_blank">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </Link>
        </div>
      </div>

      <TweetCard />

      <div className="flex flex-col gap-6 max-w-[750px] text-gray-700 dark:text-zinc-300">
        <p className="leading-relaxed">
          So here&apos;s the thing - I randomly posted some of my UI work on X
          one day and went off to grab dinner. When I came back, my phone was
          going crazy with notifications
        </p>
        <p>
          And get this - <span className="font-semibold">shadcn</span> himself
          had commented on my tweet lol.
        </p>

        <p className="leading-relaxed">
          That moment got me thinking - &quot;Hey, why not share these UI
          components with everyone?&quot; I mean, I&apos;m still learning and
          growing in design, but I feel like that&apos;s the motivation for me
          to do that.
        </p>

        <p className="leading-relaxed">
          Btw I&apos;ve got to mention my buddy{" "}
          <HoverCardUser
            name="BennyKok"
            username="@BennyKokMusic"
            iconUrl="https://github.com/bennykok.png"
            description="ComfyDeploy (S24) - Make ComfyUI accessible to everyone. "
          />{" "}
          - this guy&apos;s been my best friend, always pushing me to try new
          things. Shoutout to him!
        </p>

        <p className="leading-relaxed">
          Last thing - This is my first repo on GitHub, your support means a lot
          to me.{" "}
          <span className="font-semibold">
            I am Karrix - please enjoy the UI components!
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-[750px]">
        <h2 className="text-2xl font-medium">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I use this in my project?</AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed">
              Absolutely! This is an MIT licensed open-source project. Feel free
              to use it in any project, commercial or personal. Your feedback
              means a lot to me - I&apos;d love to hear about your experience
              using these components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How&apos;s the animation performance?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed space-y-2">
              <p>
                All complex animations are powered by Motion, while simpler UI
                interactions use shadcn&apos;s built-in transitions. I&apos;ve
                extensively tested each component to ensure optimal performance
                and ease of use.
              </p>
              <p>
                If you encounter any performance issues, please don&apos;t
                hesitate to report them - I&apos;m committed to providing the
                best possible experience.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why is there so little UI here?</AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed space-y-2">
              <p>
                Simple — because I made this with love and interest. I&apos;m
                not just throwing in random components for the sake of it.
                Everything here is something I genuinely think is the best
                I&apos;ve ever made.
              </p>
              <p>
                I&apos;ll add more when I feel it&apos;s right — when I create
                something that truly deserves a spot here. Until then, enjoy
                what&apos;s here, knowing each piece is built with real care.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                Please let me credit{" "}
                <Coffee className="inline-block h-4 w-4 text-amber-800" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed space-y-2">
              <p>
                Special thanks to{" "}
                <HoverCardUser
                  name="pqoqubbw"
                  username="@pqoqubbw"
                  iconUrl="https://github.com/pqoqubbw.png"
                  description="trying to make the web a better place "
                />{" "}
                for the amazing animated icon library that brings life to our
                navigation.
              </p>
              <p>
                Also, a huge shoutout to{" "}
                <HoverCardUser
                  name="aidenybai"
                  username="@aidenybai"
                  iconUrl="https://github.com/aidenybai.png"
                  description="is your site slow? http://react-scan.com"
                />{" "}
                &apos;s React Scan, which has been invaluable for performance
                testing and optimization. These tools have helped me a lot.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
