import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useRouter } from 'next/router';
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Settings, 
  LogOut, 
  Shield, 
  Bell, 
  Monitor,
  ChevronRight,
  Sparkles
} from "lucide-react";

const ProfilePage = () => {
  const { user, signOut } = useSupabaseAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
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

  const getDisplayName = () => {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
  };

  const getProvider = () => {
    return user?.app_metadata?.provider || "email";
  };

  const menuItems = [
    {
      icon: User,
      label: "Account Info",
      description: "Manage your personal details",
      onClick: () => {},
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Configure notification preferences",
      onClick: () => {},
    },
    {
      icon: Monitor,
      label: "Playback Settings",
      description: "Video quality and autoplay",
      onClick: () => {},
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      description: "Manage your privacy settings",
      onClick: () => {},
    },
    {
      icon: Settings,
      label: "App Preferences",
      description: "Theme, language, and more",
      onClick: () => {},
    },
  ];

  return (
    <>
      <Helmet>
        <title>Profile - PaviStream</title>
        <meta name="description" content="Manage your PaviStream account settings and preferences." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold">Profile</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Card */}
          <div className="glass-card rounded-2xl p-6 border border-border/50 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarImage src={getAvatarUrl() || undefined} alt={getDisplayName()} />
                <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{getDisplayName()}</h2>
                  {getProvider() === "github" && (
                    <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> GitHub
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Member since {new Date(user?.created_at || "").toLocaleDateString("en-US", { 
                    month: "long", 
                    year: "numeric" 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="glass-card rounded-2xl border border-border/50 overflow-hidden mb-8">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Settings</h3>
            </div>
            <div className="divide-y divide-border">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sign Out */}
          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            variant="destructive"
            className="w-full h-12 text-lg font-semibold"
          >
            {isSigningOut ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </>
            )}
          </Button>

          {/* App Info */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            PaviStream v1.0.0 • Made with ❤️ by Pavitra Gupta
          </p>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
