"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function NavigationMenu() {
  const [activeSection, setActiveSection] = useState<string>("playground");
  const navigationItems = ["playground", "installation", "props"] as const;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        rootMargin: "-10% 0px -70% 0px",
      }
    );

    const sections = ["playground", "installation", "props"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getDisplayText = (id: string) =>
    id === "props"
      ? "Props and Usage"
      : id.charAt(0).toUpperCase() + id.slice(1);

  const isActive = (id: string) =>
    id === "props"
      ? activeSection === "props" || activeSection === "usage"
      : activeSection === id;

  return (
    <nav className="hidden lg:flex flex-col gap-4 p-4 rounded-lg backdrop-blur-sm w-[250px]">
      {navigationItems.map((id) => (
        <Link
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={cn(
            "text-sm relative transition-all duration-200 ease-in-out",
            isActive(id)
              ? "text-primary font-medium translate-x-1"
              : "text-muted-foreground hover:text-primary hover:translate-x-0.5"
          )}
        >
          {getDisplayText(id)}
        </Link>
      ))}
    </nav>
  );
}
