import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center",
        "bg-secondary hover:bg-secondary/80 transition-all duration-300",
        "border border-border/50 hover:border-primary/30",
        "group"
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;