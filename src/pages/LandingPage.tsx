import { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from "react-helmet-async";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { Button } from "@/components/ui/button";
import { Film, Play, Sparkles, Zap, Shield, Globe, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>PaviStream - Your Ultimate Streaming Destination</title>
        <meta name="description" content="Stream HD movies and TV shows on PaviStream. Watch the latest blockbusters, classic films, and binge-worthy series anytime, anywhere." />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Film className="w-9 h-9 text-primary" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <span className="font-display text-2xl font-black text-gradient">PaviStream</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-primary hover:opacity-90 text-white">
                  Start Streaming
                </Button>
              </Link>
            </div>
          </header>

          {/* Hero Section */}
          <section className="px-6 py-24 md:py-40 text-center max-w-5xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="text-gradient">Stream Unlimited</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              PaviStream is your ultimate streaming platform. Watch HD movies and TV shows 
              with instant playback, anytime and anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg font-semibold group">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Streaming
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-border/50 hover:bg-muted/50 px-8 py-6 text-lg">
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-20 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose <span className="text-gradient">PaviStream</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  No buffering, no waiting. Stream your favorite content instantly.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Safe & Secure</h3>
                <p className="text-muted-foreground">
                  Your data is protected. Stream with peace of mind.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Watch Anywhere</h3>
                <p className="text-muted-foreground">
                  Access PaviStream on any device - phone, tablet, or laptop.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-20 max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Start Streaming?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Join now and enjoy unlimited entertainment on PaviStream.
                </p>
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-10 py-6 text-lg font-semibold">
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 py-10 border-t border-border/20 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Film className="w-6 h-6 text-primary" />
                <span className="font-display text-lg font-bold text-foreground">PaviStream</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
