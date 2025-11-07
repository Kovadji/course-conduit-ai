import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Calendar,
  ShoppingCart,
  ClipboardList,
  Users,
  MapIcon,
  FlaskConical,
  Library,
  NotebookPen,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Ai-tutor", url: "/ai-tutor", icon: GraduationCap },
  { title: "Student Roadmap", url: "/student-roadmap", icon: MapIcon },
  { title: "Forum", url: "/forum", icon: Users },
  { title: "Virtual Lab", url: "/virtual-lab", icon: FlaskConical },
  { title: "Library", url: "/library", icon: Library },
  { title: "Notes", url: "/notes", icon: NotebookPen },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Cart", url: "/cart", icon: ShoppingCart },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-sidebar-accent"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
