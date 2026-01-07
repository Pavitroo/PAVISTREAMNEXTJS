import { memo, useCallback, useState, useRef } from "react";
import { Play, X, Plus, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentItem, Episode } from "@/data/content";
import doraemonPoster from "@/assets/doraemon-poster.jfif";

interface ShowDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentItem | null;
  onPlayEpisode: (episode: Episode) => void;
  onWatch: () => void;
}

// Lazy loaded episode item for better performance
const EpisodeItem = memo(({ episode, thumbnail, onPlay }: { 
  episode: Episode; 
  thumbnail: string;
  onPlay: () => void;
}) => (
  <button
    onClick={onPlay}
    className="flex-shrink-0 w-40 md:w-48 group"
  >
    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/20 mb-2">
      <img 
        src={thumbnail}
        alt={episode.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
          <Play className="w-5 h-5 text-black fill-black ml-0.5" />
        </div>
      </div>
    </div>
    <p className="text-sm text-foreground font-medium truncate group-hover:text-primary transition-colors">
      {episode.title}
    </p>
    <p className="text-xs text-muted-foreground">24m</p>
  </button>
));

EpisodeItem.displayName = 'EpisodeItem';

const ShowDetails = memo(({ isOpen, onClose, content, onPlayEpisode, onWatch }: ShowDetailsProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const episodesRef = useRef<HTMLDivElement>(null);

  const scrollEpisodes = useCallback((direction: 'left' | 'right') => {
    if (episodesRef.current) {
      const scrollAmount = 400;
      episodesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  const handlePlayEpisode = useCallback((episode: Episode) => {
    onPlayEpisode(episode);
  }, [onPlayEpisode]);

  if (!isOpen || !content) return null;

  const isSeries = content.type === "series";
  const genres = content.genre.split(",").map(g => g.trim());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative min-h-screen flex items-start justify-center py-4 md:py-8">
        <div className="relative w-full max-w-4xl mx-4 bg-card rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Hero Banner Section */}
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <img 
              src={content.poster} 
              alt={content.title}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent" />
            
            {/* Mute Button */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:border-white/60 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white/80" /> : <Volume2 className="w-5 h-5 text-white/80" />}
            </button>
          </div>

          {/* Content Section */}
          <div className="relative -mt-48 md:-mt-64 px-6 md:px-10 pb-8">
            {/* Title */}
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3 drop-shadow-lg">
              {content.title}
            </h1>

            {/* Popularity Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-muted-foreground text-sm">Popular with viewers</span>
              <span className="text-primary text-sm font-medium">• Blockbuster</span>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm text-foreground/90 mb-4">
              <span className="font-semibold">{content.year}</span>
              <span className="text-muted-foreground">•</span>
              <span className="px-1.5 py-0.5 border border-border text-xs">{content.rating}</span>
              <span className="text-muted-foreground">•</span>
              <span>{isSeries ? `${content.episodes?.length || 0} Episodes` : content.duration}</span>
              <span className="text-muted-foreground">•</span>
              <span>Hindi</span>
            </div>

            {/* Description */}
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
              {content.overview}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {genres.map((genre, index) => (
                <span key={genre} className="flex items-center">
                  <span className="text-foreground font-medium text-sm">{genre}</span>
                  {index < genres.length - 1 && <span className="text-muted-foreground mx-2">|</span>}
                </span>
              ))}
            </div>

            {/* Language Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-2 rounded-full bg-primary/20 text-foreground text-sm font-medium hover:bg-primary/30 transition-colors cursor-pointer">
                Hindi Original
              </span>
              <span className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer">
                English
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <button 
                onClick={isSeries ? () => content.episodes?.[0] && onPlayEpisode(content.episodes[0]) : onWatch}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 md:px-12 py-3.5 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 via-pink-500 to-purple-500 hover:from-pink-500 hover:via-pink-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-pink-500/30"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Watch Now</span>
              </button>
              <button className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Episodes Section for Series */}
            {isSeries && content.episodes && content.episodes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <div className="flex items-center gap-8">
                    <button className="text-foreground font-semibold text-sm border-b-2 border-primary pb-2 -mb-3.5">
                      Episodes ({content.episodes.length})
                    </button>
                    <button className="text-muted-foreground hover:text-foreground text-sm transition-colors pb-2 -mb-3.5">
                      More Like This
                    </button>
                  </div>
                  
                  {/* Scroll Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scrollEpisodes('left')}
                      className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <button 
                      onClick={() => scrollEpisodes('right')}
                      className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                </div>
                
                {/* Horizontal Scrolling Episodes */}
                <div 
                  ref={episodesRef}
                  className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 custom-scrollbar scroll-smooth"
                >
                  {content.episodes.map((episode) => (
                    <EpisodeItem 
                      key={episode.id}
                      episode={episode}
                      thumbnail={doraemonPoster}
                      onPlay={() => handlePlayEpisode(episode)}
                    />
                  ))}
                </div>
                
                <p className="text-center text-muted-foreground text-sm mt-2">
                  Use arrows or scroll to browse all {content.episodes.length} episodes
                </p>
              </div>
            )}

            {/* Cast Section */}
            {content.cast && content.cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-foreground font-semibold mb-3">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {content.cast.map((person, index) => (
                    <span key={index} className="px-3 py-1.5 rounded-full bg-muted text-foreground/80 text-sm">
                      {person.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 md:px-10 pb-6 pt-4 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ShowDetails.displayName = 'ShowDetails';

export default ShowDetails;
