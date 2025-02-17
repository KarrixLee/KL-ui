import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export function HoverCardUser({
  name,
  username,
  iconUrl,
  description,
}: {
  name: string;
  username: string;
  iconUrl: string;
  description: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="underline h-fit p-0 text-base">
          {name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Image
            src={iconUrl}
            alt={name}
            width={40}
            height={40}
            className="rounded-full min-w-14 max-h-14"
          />
          <div className="space-y-1">
            <Link href={`https://x.com/${username}`} target="_blank">
              <h4 className="text-sm font-semibold">{username}</h4>
            </Link>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <LinkIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                x.com/{username}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
