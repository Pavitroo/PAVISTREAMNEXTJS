import { Play, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  id?: string;
  title: string;
  year: string;
  rating: string;
  genre: string;
  poster: string;
  duration?: string;
  onWatch: () => void;
  onDetails: () => void;
}

const MovieCard = ({ id, title, year, rating, genre, poster, duration, onWatch, onDetails }: MovieCardProps) => {
  const isFullHD = id === "3idiots";

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "hover:scale-[1.02] hover:-translate-y-3",
        "shadow-card hover:shadow-elevated",
        "bg-card border border-border/40"
      )}
      onClick={onDetails}
    >
      {/* Poster */}
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Play Button - Centered with modern design */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onWatch();
        }}
        className={cn(
          "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-14 h-14 rounded-full flex items-center justify-center",
          "bg-primary/90 text-primary-foreground backdrop-blur-md",
          "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100",
          "transition-all duration-400 ease-out",
          "shadow-lg shadow-primary/30",
          "border border-primary-foreground/20"
        )}
      >
        <Play className="w-6 h-6 fill-current ml-0.5" />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 space-y-2.5">
        {/* Rating & Meta */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-foreground/10 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-foreground font-semibold text-xs">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">{year}</span>
          {duration && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="font-display text-lg md:text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        {/* Genre */}
        <p className="text-xs md:text-sm text-muted-foreground">{genre}</p>
      </div>

      {/* Top Badges */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        {isFullHD && (
          <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-md shadow-md">
            FULL HD
          </span>
        )}
        <span className={cn(
          "px-2 py-1 bg-gradient-primary text-primary-foreground text-[10px] font-bold rounded-md shadow-md",
          "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
        )}>
          HD
        </span>
      </div>
      
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/50 group-hover:ring-primary/30 transition-all duration-300" />
    </div>
  );
};

export default MovieCard;