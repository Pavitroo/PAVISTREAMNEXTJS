import { Play, Star, Clock, Calendar, Info, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentItem } from "@/data/content";

interface MovieHeroProps {
  content: ContentItem;
  onWatch: () => void;
  onMoreInfo: () => void;
}

const MovieHero = ({ content, onWatch, onMoreInfo }: MovieHeroProps) => {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image with subtle zoom */}
      <div className="absolute inset-0">
        <img
          src={content.poster}
          alt={content.title}
          className="w-full h-full object-cover object-center scale-[1.02] animate-slow-zoom"
        />
        {/* Modern layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        
        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 animate-slide-up">
        <div className="max-w-3xl space-y-6">
          {/* Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1.5 bg-gradient-primary text-primary-foreground text-[11px] font-bold rounded-lg flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3" />
              FEATURED
            </span>
            <span className="px-3 py-1.5 bg-foreground/10 backdrop-blur-md text-foreground text-[11px] font-semibold rounded-lg border border-border/50">
              {content.genre.split('/')[0].toUpperCase()}
            </span>
          </div>

          {/* Title - Clean, bold typography */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[0.95]">
            {content.title}
          </h1>

          {/* Meta info - Minimal, clean design */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-foreground font-bold">{content.rating}</span>
              <span className="text-muted-foreground text-xs">/10</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{content.year}</span>
            </div>
            {content.duration && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-medium">{content.duration}</span>
                </div>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span className="text-muted-foreground font-medium">{content.genre}</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm md:text-base line-clamp-2 md:line-clamp-3">
            {content.overview}
          </p>

          {/* Actions - Modern button design */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onWatch}
              className={cn(
                "group flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
                "transition-all duration-300 ease-out",
                "active:scale-[0.98]"
              )}
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </button>

            <button
              onClick={onMoreInfo}
              className={cn(
                "flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold",
                "bg-foreground/10 backdrop-blur-md text-foreground",
                "hover:bg-foreground/15 transition-all duration-300",
                "border border-border/50"
              )}
            >
              <Info className="w-4 h-4" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;