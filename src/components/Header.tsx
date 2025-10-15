import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Award, Info, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };
  return (
    <header className="fixed top-0 right-0 left-0 h-16 border-b border-border bg-background z-50 flex items-center justify-between px-6">
      <SidebarTrigger className="ml-2" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-muted">BK</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-2 text-sm font-medium">Batyrkhan</div>
          <DropdownMenuItem>
            <Award className="mr-2 h-4 w-4" />
            <span>Achievements</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            <span>About us</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>FAQ</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
