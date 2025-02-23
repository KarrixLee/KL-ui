"use client";

import {
  InfoCard,
  InfoCardAction,
  InfoCardContent,
  InfoCardDescription,
  InfoCardDismiss,
  InfoCardFooter,
  InfoCardMedia,
  InfoCardTitle,
} from "@/registry/kl-ui/info-card/info-card";
import { Button } from "@/components/ui/button";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Calendar,
  ChevronsUpDown,
  Code,
  Copy,
  ExternalLink,
  Home,
  Inbox,
  RotateCcw,
  Search,
  Settings,
  User,
  Check,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CodeDisplay, infoCardDemoCode } from "./code";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MediaItem {
  type?: "image" | "video";
  src: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

interface Option {
  id: "images" | "video" | "no-media" | "code";
  label: string;
}

interface InfoCardDemoProps {
  initialCodeHtml: string;
}

export function InfoCardDemo({ initialCodeHtml }: InfoCardDemoProps) {
  const [selected, setSelected] = useState<Option["id"]>("images");
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isInPlayground, setIsInPlayground] = useState(true);

  const options: Option[] = [
    { id: "images", label: "Images" },
    { id: "video", label: "Video" },
    { id: "no-media", label: "Notification" },
    { id: "code", label: "Code" },
  ];

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  const handleCopy = async () => {
    try {
      if (copied) return;

      await navigator.clipboard.writeText(infoCardDemoCode);
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
          <SidebarDemo _key={key}>
            {selected === "images" && <ImageContent />}
            {selected === "video" && <VideoContent />}
            {selected === "no-media" && <NoMediaContent />}
          </SidebarDemo>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInPlayground && (
          <div className="fixed bottom-6 md:left-1/2 md:-translate-x-1/2 right-3 md:right-auto z-30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col-reverse md:flex-row gap-2 items-end md:items-center">
                <div className="bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-sm p-1 rounded-lg border border-gray-100/50 shadow-lg overflow-x-auto scrollbar-hide">
                  <div className="flex items-center min-w-fit">
                    {options.map((option, index) => (
                      <Fragment key={option.id}>
                        {index > 0 && <div className="w-px h-4 bg-gray-100" />}
                        <div className="relative">
                          <Button
                            variant="ghost"
                            className={`text-gray-700 rounded-md px-4 relative whitespace-nowrap ${
                              selected === option.id
                                ? ""
                                : "opacity-50 hover:opacity-100"
                            }`}
                            onClick={() => setSelected(option.id)}
                          >
                            {option.label}
                            {option.id === "code" && (
                              <Code className="h-4 w-4" />
                            )}
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

export function SidebarDemo({
  children,
  _key,
}: {
  children: React.ReactNode;
  _key: number;
}) {
  return (
    <div className="h-full p-2">
      <div className="relative max-w-[350px] md:mx-auto md:w-full h-full border-l border-y border-gray-200 rounded-l-lg shadow-md">
        <SidebarProvider
          key={_key}
          className="absolute h-full left-0 top-0 min-h-full rounded-l-lg overflow-hidden"
          forceDesktop={true}
        >
          <Sidebar className="absolute h-full" forceDesktop={true}>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              {children}
              <SidebarGroup>
                <SidebarMenuButton className="w-full justify-between gap-3 h-12">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 rounded-md" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">KL</span>
                      <span className="text-xs text-muted-foreground">
                        kl@example.com
                      </span>
                    </div>
                  </div>
                  <ChevronsUpDown className="h-5 w-5 rounded-md" />
                </SidebarMenuButton>
              </SidebarGroup>
            </SidebarFooter>
          </Sidebar>
          <div className="px-4 py-2">
            <SidebarTrigger />
          </div>
        </SidebarProvider>

        <div className="absolute -right-4 top-0 h-full w-10 bg-white pointer-events-none" />
      </div>
    </div>
  );
}

// ==============================

// Image content component
function ImageContent() {
  return (
    <InfoCard>
      <InfoCardContent>
        <InfoCardTitle>Introducing New Dashboard</InfoCardTitle>
        <InfoCardDescription>
          New Feature. New Platform. Same Feel.
        </InfoCardDescription>
        <InfoCardMedia
          media={[
            {
              src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/third.webp",
            },
            {
              src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/second.webp",
            },
            {
              src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/first.webp",
            },
          ]}
        />
        <InfoCardFooter>
          <InfoCardDismiss>Dismiss</InfoCardDismiss>
          <InfoCardAction>
            <Link
              href="#"
              className="flex flex-row items-center gap-1 underline"
            >
              Try it out <ExternalLink size={12} />
            </Link>
          </InfoCardAction>
        </InfoCardFooter>
      </InfoCardContent>
    </InfoCard>
  );
}

// Video content component
function VideoContent() {
  return (
    <InfoCard>
      <InfoCardContent>
        <InfoCardTitle>Video Walkthrough</InfoCardTitle>
        <InfoCardDescription>
          Watch how the new dashboard works.
        </InfoCardDescription>
        <InfoCardMedia
          media={[
            {
              type: "video",
              src: "https://video.twimg.com/ext_tw_video/1811493439357476864/pu/vid/avc1/1280x720/r_A2n1_eDbYiTMkU.mp4?tag=12",
              autoPlay: true,
              loop: true,
            },
          ]}
          expandHeight={120}
        />
        <InfoCardFooter>
          <InfoCardDismiss>Dismiss</InfoCardDismiss>
          <InfoCardAction>
            <Link
              href="#"
              className="flex flex-row items-center gap-1 underline"
            >
              Learn more <ExternalLink size={12} />
            </Link>
          </InfoCardAction>
        </InfoCardFooter>
      </InfoCardContent>
    </InfoCard>
  );
}

// No media content component
function NoMediaContent() {
  return (
    <InfoCard>
      <InfoCardContent>
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-[14px] h-[14px] bg-blue-500 rounded-full animate-ping" />
          <motion.div
            className="absolute -top-4 -right-4 w-[14px] h-[14px] bg-blue-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          />
          <InfoCardTitle>Simple Announcement</InfoCardTitle>
          <InfoCardDescription>
            This is a simple announcement without any media content.
          </InfoCardDescription>
          <InfoCardFooter>
            <InfoCardDismiss>Dismiss</InfoCardDismiss>
            <InfoCardAction>
              <Link
                href="#"
                className="flex flex-row items-center gap-1 underline"
              >
                Read more <ExternalLink size={12} />
              </Link>
            </InfoCardAction>
          </InfoCardFooter>
        </div>
      </InfoCardContent>
    </InfoCard>
  );
}

// Multi-step content component
interface Step {
  title: string;
  description: string;
  image: MediaItem[];
  expandHeight?: number;
}

export function MultiStepContent() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: "Welcome to Our Platform!",
      description: "Let's take a quick tour of our new features!",
      image: [
        {
          src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/second.webp",
        },
        {
          src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/third.webp",
        },
        {
          src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/first.webp",
        },
      ],
    },
    {
      title: "Powerful Dashboard!",
      description: "Everything you need, right at your fingertips!",
      image: [
        {
          type: "video",
          src: "https://video.twimg.com/ext_tw_video/1811493439357476864/pu/vid/avc1/1280x720/r_A2n1_eDbYiTMkU.mp4?tag=12",
          autoPlay: true,
          loop: true,
          className: "shadow-none",
        },
      ],
      expandHeight: 120,
    },
    {
      title: "Useful Tips!",
      description: "You can also use the sidebar to go to different pages!",
      image: [
        {
          src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/third.webp",
        },
        {
          src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/second.webp",
        },
      ],
      expandHeight: 140,
    },
    {
      title: "Ready to Start?",
      description: "You're all set to explore the platform!",
      image: [
        {
          src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/first.webp",
          className: "shadow-none",
        },
      ],
      expandHeight: 140,
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <InfoCard>
      <InfoCardContent>
        <InfoCardTitle>{steps[currentStep].title}</InfoCardTitle>
        <InfoCardDescription>
          {steps[currentStep].description}
        </InfoCardDescription>
        {steps[currentStep].image && (
          <InfoCardMedia
            media={steps[currentStep].image}
            expandHeight={steps[currentStep].expandHeight || undefined}
          />
        )}
        <InfoCardFooter>
          {currentStep === steps.length - 1 ? (
            <>
              <div />
              <InfoCardDismiss className="flex flex-row items-center gap-1 hover:underline hover:cursor-pointer">
                Got it! <Check size={12} />
              </InfoCardDismiss>
            </>
          ) : (
            <>
              <InfoCardDismiss>Dismiss</InfoCardDismiss>
              <InfoCardAction
                onClick={handleNext}
                className="flex flex-row items-center gap-1 hover:underline hover:cursor-pointer"
              >
                Next <ChevronRight size={12} />
              </InfoCardAction>
            </>
          )}
        </InfoCardFooter>
      </InfoCardContent>
    </InfoCard>
  );
}
