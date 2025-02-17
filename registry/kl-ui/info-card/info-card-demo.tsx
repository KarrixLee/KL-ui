import {
  InfoCard,
  InfoCardContent,
  InfoCardTitle,
  InfoCardDescription,
  InfoCardMedia,
  InfoCardFooter,
  InfoCardDismiss,
  InfoCardAction,
} from "@/registry/kl-ui/info-card/info-card";
// } from "@/components/kl-ui/info-card";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ExternalLink,
  User,
  ChevronsUpDown,
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";

// Menu items.
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

export function InfoCardDemo() {
  return (
    <SidebarProvider>
      <Sidebar>
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
  );
}
