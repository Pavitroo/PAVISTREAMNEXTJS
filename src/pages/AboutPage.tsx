import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Tv, Sparkles, Heart } from "lucide-react";
import AdsterraAd from "@/components/AdsterraAd";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About PaviStream - Free HD Movie Streaming Platform</title>
        <meta
          name="description"
          content="Learn about PaviStream - a free HD movie and TV show streaming platform created by Pavitra Gupta. Stream quality content without any subscription."
        />
        <link rel="canonical" href="https://pavistream.vercel.app/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-foreground">About Us</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome to <span className="text-gradient">PaviStream</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your destination for free HD movies and TV shows
            </p>
          </div>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Our Story</h2>
              <p>
                PaviStream was created by <strong className="text-foreground">Pavitra Gupta</strong>, a passionate developer from Delhi, India. 
                The vision behind PaviStream is simple: to provide high-quality entertainment content that's accessible to everyone, 
                without the barrier of expensive subscriptions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">What We Offer</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <Film className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">HD Movies</h3>
                  <p className="text-sm">Stream blockbuster movies in high definition quality, from Hollywood to Bollywood.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <Tv className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">TV Shows</h3>
                  <p className="text-sm">Binge-watch your favorite series with all episodes available for free.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <Sparkles className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">AI Recommendations</h3>
                  <p className="text-sm">Get personalized suggestions from our Pavi AI assistant.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p>
                We believe entertainment should be accessible to everyone. PaviStream is committed to providing 
                a seamless streaming experience with a curated collection of quality content. Our platform is 
                designed to be fast, user-friendly, and completely free.
              </p>
            </section>

            <section className="text-center pt-8">
              <p className="flex items-center justify-center gap-2 text-lg">
                Made with <Heart className="w-5 h-5 text-red-500 fill-red-500" /> in Delhi, India
              </p>
            </section>
          </div>

          <AdsterraAd />
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-primary font-medium">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
