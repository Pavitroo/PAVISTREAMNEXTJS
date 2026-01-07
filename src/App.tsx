import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/hooks/useTheme";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
// ...existing code...

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Page content will be rendered by Next.js routing. */}
        </TooltipProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
