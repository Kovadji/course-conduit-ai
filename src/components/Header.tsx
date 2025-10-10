import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 h-16 border-b border-border bg-background z-50 flex items-center justify-between px-6">
      <SidebarTrigger className="ml-2" />
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-muted">BK</AvatarFallback>
      </Avatar>
    </header>
  );
}
