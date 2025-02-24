"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Book,
  Clock,
  Download,
  GalleryVerticalEnd,
  Moon,
  SaveOff,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange, open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Components">
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/components/info-card"))
            }
          >
            <GalleryVerticalEnd className="mr-2 h-4 w-4" />
            Info Card
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/components/unsave-popup"))
            }
          >
            <SaveOff className="mr-2 h-4 w-4" />
            Unsave Popup
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Getting Started">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <Book className="mr-2 h-4 w-4" />
            Introduction
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/installation"))}
          >
            <Download className="mr-2 h-4 w-4" />
            Installation
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dark-mode"))}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark Mode
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/changelog"))}
          >
            <Clock className="mr-2 h-4 w-4" />
            Changelog
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
