import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { Film, ArrowLeft } from "lucide-react";
import { content } from "@/data/content";
import AdsterraAd from "@/components/AdsterraAd";

const MoviesPage = () => {
  const movies = content.filter((item) => item.type === "movie");

  return (
    <>
      <Helmet>
        <title>Movies - Watch HD Movies Online | PaviStream</title>
        <meta
          name="description"
          content="Stream HD movies on PaviStream. Watch Interstellar, 3 Idiots, Dhurandhar, Tumbbad and more blockbusters in Full HD quality for free."
        />
        <meta name="keywords" content="watch movies online, HD movies, free movies, Interstellar, 3 Idiots, Tumbbad, Dhurandhar, PaviStream" />
        <link rel="canonical" href="https://pavistream.vercel.app/movies" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div className="flex items-center gap-3">
              <Film className="w-7 h-7 text-primary" />
              <h1 className="font-display text-2xl font-bold text-foreground">Movies</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground mb-8">
            Explore our premium collection of {movies.length} movies in HD quality
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {movie.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                      <span>•</span>
                      <span className="text-primary font-medium">⭐ {movie.rating}</span>
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

export default MoviesPage;
