import { useState, useEffect } from "react";
import { Search, X, Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  rating: string;
  poster: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onMovieSelect: (movieId: string) => void;
}

const SearchModal = ({ isOpen, onClose, movies, onMovieSelect }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, movies]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleMovieClick = (movieId: string) => {
    onMovieSelect(movieId);
    setQuery("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl animate-scale-in">
        {/* Search Input */}
        <div className="relative glass-strong rounded-2xl overflow-hidden shadow-elevated">
          <div className="flex items-center gap-4 px-6 py-4">
            <Search className="w-6 h-6 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, genres..."
              className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Results */}
          {query && (
            <div className="border-t border-border">
              {results.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {results.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors text-left"
                    >
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-16 h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{movie.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {movie.year} • {movie.genre}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {movie.rating}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Film className="w-12 h-12 mb-3 opacity-50" />
                  <p>No movies found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hint */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Press <kbd className="px-2 py-1 rounded bg-muted text-xs">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
};

export default SearchModal;
