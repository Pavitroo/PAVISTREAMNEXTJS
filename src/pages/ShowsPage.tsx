import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { Tv, ArrowLeft } from "lucide-react";
import { content } from "@/data/content";
import AdsterraAd from "@/components/AdsterraAd";

const ShowsPage = () => {
  const shows = content.filter((item) => item.type === "series");

  return (
    <>
      <Helmet>
        <title>TV Shows - Watch Series Online Free | PaviStream</title>
        <meta
          name="description"
          content="Stream TV shows and series on PaviStream. Watch Doraemon and more popular shows in HD quality for free."
        />
        <meta name="keywords" content="watch TV shows online, free series, Doraemon episodes, anime, PaviStream" />
        <link rel="canonical" href="https://pavistream.vercel.app/shows" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <Tv className="w-7 h-7 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground">TV Shows</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground mb-8">
            Binge-watch {shows.length} amazing series in HD quality
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shows.map((show, index) => (
              <Link
                key={show.id}
                to={`/shows/${show.id}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={show.poster}
                      alt={show.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    {show.episodes?.length || 0} Episodes
                  </div>
                  <div className="p-4">
                    <h2 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {show.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span>{show.year}</span>
                      <span>•</span>
                      <span>{show.genre}</span>
                      <span>•</span>
                      <span className="text-primary font-medium">⭐ {show.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
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

export default ShowsPage;
