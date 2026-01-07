import { Home, Search, Tv, Popcorn, Moon, Sun, BrainCircuit, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from 'next/router';
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSearchClick?: () => void;
  onAIClick?: () => void;
}

const Sidebar = ({ activeTab, onTabChange, onSearchClick, onAIClick }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useSupabaseAuth();
  const router = useRouter();
  const location = useLocation();

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/home" },
    { id: "search", icon: Search, label: "Search", path: "/search", action: onSearchClick },
    { id: "shows", icon: Tv, label: "Shows", path: "/shows" },
    { id: "movies", icon: Popcorn, label: "Movies", path: "/movies" },
    { id: "ai", icon: BrainCircuit, label: "Pavi AI", path: "/ai", action: onAIClick },
  ];

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/home") return "home";
    if (path.startsWith("/movies")) return "movies";
    if (path.startsWith("/shows")) return "shows";
    if (path === "/search") return "search";
    if (path === "/ai") return "ai";
    return activeTab || "home";
  };

  const currentTab = getActiveTab();

  const handleClick = (item: typeof navItems[0]) => {
    if (item.action && location.pathname === "/home") {
      item.action();
    } else {
      router.push(item.path);
    }
    if (onTabChange) onTabChange(item.id);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getAvatarUrl = () => {
    // GitHub provides avatar_url in user_metadata
    return user?.user_metadata?.avatar_url || null;
  };

  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-16 z-40",
          "hidden md:flex flex-col items-center py-6",
          "bg-sidebar border-r border-sidebar-border",
          "shadow-lg"
        )}
      >
        {/* User Avatar at Top */}
        {user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => router.push("/profile")}
                className="mb-4 transition-transform hover:scale-105"
              >
                <Avatar className="w-10 h-10 border-2 border-primary/50">
                  <AvatarImage src={getAvatarUrl() || undefined} alt="Profile" />
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-sm">View Profile</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center gap-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleClick(item)}
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center",
                      "transition-all duration-300 ease-out",
                      "hover:bg-sidebar-accent group relative",
                      isActive && "bg-primary/15"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-primary"
                      )}
                    />
                    {isActive && (
                      <div className="absolute left-0 w-0.5 h-6 bg-primary rounded-r-full" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col items-center gap-2 mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleTheme}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center",
                  "transition-all duration-300 ease-out",
                  "hover:bg-sidebar-accent group"
                )}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-sidebar-foreground group-hover:text-primary transition-colors" />
                ) : (
                  <Moon className="w-5 h-5 text-sidebar-foreground group-hover:text-primary transition-colors" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
            </TooltipContent>
          </Tooltip>

          {user && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center",
                    "transition-all duration-300 ease-out",
                    "hover:bg-destructive/20 group"
                  )}
                >
                  <LogOut className="w-5 h-5 text-sidebar-foreground group-hover:text-destructive transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sign out</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40",
          "md:hidden flex items-center justify-around",
          "bg-sidebar/95 backdrop-blur-lg border-t border-sidebar-border",
          "px-2 py-2 safe-area-inset-bottom"
        )}
      >
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl",
                "transition-all duration-200",
                isActive ? "text-primary" : "text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
        {user && (
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl text-sidebar-foreground"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        )}
      </nav>
    </TooltipProvider>
  );
};

export default Sidebar;