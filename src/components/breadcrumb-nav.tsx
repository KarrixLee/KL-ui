"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Book, Slash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

export function BreadcrumbNav() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    // Add "Introduction" for the root path
    if (segments.length === 0) {
      return [
        {
          label: "Introduction",
          path: "/",
          isLast: true,
        },
      ];
    }

    return segments
      .map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const label = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const isLast = index === segments.length - 1;

        // For components, show both "Components" and the component name
        if (segment === "components" && segments[index + 1]) {
          return [
            {
              label: "Components",
              path,
              isLast: false,
            } as BreadcrumbItem,
            {
              label: segments[index + 1]
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              path: `${path}/${segments[index + 1]}`,
              isLast: true,
            } as BreadcrumbItem,
          ];
        }

        // Skip the individual component segments since we handle them above
        if (segments[index - 1] === "components") return null;

        return {
          label,
          path,
          isLast,
        } as BreadcrumbItem;
      })
      .flat()
      .filter((item): item is BreadcrumbItem => item !== null);
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <Book className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map(({ label, path, isLast }) => (
          <BreadcrumbItem key={path}>
            <BreadcrumbSeparator>
              <Slash className="h-4 w-4 shrink-0" />
            </BreadcrumbSeparator>
            {isLast || label === "Components" ? (
              <BreadcrumbPage
                className={cn(
                  label === "Components" && "text-muted-foreground"
                )}
              >
                {label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
