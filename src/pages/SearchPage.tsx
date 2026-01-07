import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { Search, ArrowLeft, Film } from "lucide-react";
import { content } from "@/data/content";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(content);

  useEffect(() => {
    if (query.trim()) {
      const filtered = content.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genre.toLowerCase().includes(query.toLowerCase()) ||
          item.overview.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(content);
    }
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Search Movies & Shows | PaviStream</title>
        <meta
          name="description"
          content="Search for your favorite movies and TV shows on PaviStream. Find and stream content in HD quality."
        />
        <link rel="canonical" href="https://pavistream.vercel.app/search" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, shows, genres..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground mb-6">
            {query ? `${results.length} results for "${query}"` : `Browse all ${content.length} titles`}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.type === "movie" ? `/movies/${item.id}` : `/shows/${item.id}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full capitalize">
                      {item.type}
                    </div>
                    <div className="p-4">
                      <h2 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.genre}</span>
                        <span>•</span>
                        <span className="text-primary font-medium">⭐ {item.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Film className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-2">Try searching for something else</p>
            </div>
          )}
        </main>

        {/* Footer - No Ads on Search */}
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

export default SearchPage;
