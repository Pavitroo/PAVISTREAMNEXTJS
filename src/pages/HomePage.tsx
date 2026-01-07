import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import Sidebar from "@/components/Sidebar";
import MovieHero from "@/components/MovieHero";
import MovieCard from "@/components/MovieCard";
import ShowDetails from "@/components/ShowDetails";
import SearchModal from "@/components/SearchModal";
import VideoPlayer from "@/components/VideoPlayer";
import PaviAI from "@/components/PaviAI";
import AdsterraAd from "@/components/AdsterraAd";
import { content, getContentById, getFeaturedContent, ContentItem, Episode } from "@/data/content";
import { Sparkles, Film, Tv } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playerData, setPlayerData] = useState({ title: "", subtitle: "", videoUrl: "" });
  const [isAIOpen, setIsAIOpen] = useState(false);

  const featuredContent = getFeaturedContent();

  // Filter content by type
  const movies = content.filter(item => item.type === "movie").map((item) => ({
    id: item.id,
    title: item.title,
    year: item.year,
    genre: item.genre,
    rating: item.rating,
    poster: item.poster,
    duration: item.duration,
  }));

  const shows = content.filter(item => item.type === "series").map((item) => ({
    id: item.id,
    title: item.title,
    year: item.year,
    genre: item.genre,
    rating: item.rating,
    poster: item.poster,
    duration: item.duration,
  }));

  const allContent = content.map((item) => ({
    id: item.id,
    title: item.title,
    year: item.year,
    genre: item.genre,
    rating: item.rating,
    poster: item.poster,
    duration: item.duration,
  }));

  const handleWatch = () => {
    if (selectedContent?.type === "movie" && selectedContent.videoUrl) {
      setIsDetailsOpen(false);
      setPlayerData({ title: selectedContent.title, subtitle: `(${selectedContent.year})`, videoUrl: selectedContent.videoUrl });
      setIsPlayerOpen(true);
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    if (selectedContent) {
      setIsDetailsOpen(false);
      setPlayerData({ title: selectedContent.title, subtitle: episode.title, videoUrl: episode.url });
      setIsPlayerOpen(true);
    }
  };

  const handleContentSelect = (contentId: string) => {
    const item = getContentById(contentId);
    if (item) {
      setSelectedContent(item);
      setIsDetailsOpen(true);
    }
  };

  const handleHeroWatch = () => {
    if (featuredContent.videoUrl) {
      setPlayerData({ title: featuredContent.title, subtitle: `(${featuredContent.year})`, videoUrl: featuredContent.videoUrl });
      setIsPlayerOpen(true);
    }
  };

  if (isPlayerOpen) {
    return <VideoPlayer onBack={() => setIsPlayerOpen(false)} title={playerData.title} subtitle={playerData.subtitle} videoUrl={playerData.videoUrl} />;
  }

  return (
    <>
      <Helmet>
        <title>PaviStream - Stream HD Movies & Shows Online</title>
        <meta name="description" content="Watch the latest HD movies and TV shows on PaviStream. Stream Interstellar, 3 Idiots, Dhurandhar, Doraemon and more in Full HD quality." />
      </Helmet>

      <div className="min-h-screen flex w-full bg-background pb-20 md:pb-0">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onSearchClick={() => setIsSearchOpen(true)} 
          onAIClick={() => setIsAIOpen(true)}
        />

        <main className="flex-1 md:ml-16">
          {activeTab === "home" && (
            <div className="animate-fade-in">
              <MovieHero content={featuredContent} onWatch={handleHeroWatch} onMoreInfo={() => handleContentSelect(featuredContent.id)} />
              
              {/* Featured Section */}
              <section className="px-4 md:px-10 lg:px-16 py-16">
                <div className="flex items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-primary rounded-full" />
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Featured Collection</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                  {allContent.map((movie, index) => (
                    <div key={movie.id} className="animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                      <MovieCard {...movie} onWatch={() => handleContentSelect(movie.id)} onDetails={() => handleContentSelect(movie.id)} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Adsterra Ad */}
              <AdsterraAd />

              {/* Footer */}
              <footer className="px-4 md:px-10 py-10 border-t border-border/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                    <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                    <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                    <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Streaming in HD
                  </div>
                </div>
              </footer>
            </div>
          )}

          {activeTab === "movies" && (
            <div className="animate-fade-in px-4 md:px-12 lg:px-16 py-8 pt-12">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <Film className="w-8 h-8 text-primary" />
                  <h1 className="font-display text-4xl md:text-5xl font-black text-foreground">
                    <span className="text-gradient">Movies</span>
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg">Watch our premium movie collection in HD</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {movies.map((movie, index) => (
                  <div key={movie.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <MovieCard {...movie} onWatch={() => handleContentSelect(movie.id)} onDetails={() => handleContentSelect(movie.id)} />
                  </div>
                ))}
              </div>
              
              {movies.length === 0 && (
                <div className="text-center py-20">
                  <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No movies available yet</p>
                </div>
              )}
              
              {/* Footer */}
              <footer className="mt-16 py-8 border-t border-border/30">
                <p className="text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
                </p>
              </footer>
            </div>
          )}

          {activeTab === "shows" && (
            <div className="animate-fade-in px-4 md:px-12 lg:px-16 py-8 pt-12">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <Tv className="w-8 h-8 text-primary" />
                  <h1 className="font-display text-4xl md:text-5xl font-black text-foreground">
                    <span className="text-gradient">TV Shows</span>
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg">Binge-watch your favorite series</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {shows.map((show, index) => (
                  <div key={show.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <MovieCard {...show} onWatch={() => handleContentSelect(show.id)} onDetails={() => handleContentSelect(show.id)} />
                  </div>
                ))}
              </div>
              
              {shows.length === 0 && (
                <div className="text-center py-20">
                  <Tv className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No TV shows available yet</p>
                </div>
              )}
              
              {/* Footer */}
              <footer className="mt-16 py-8 border-t border-border/30">
                <p className="text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Pavitra Gupta. All rights reserved.
                </p>
              </footer>
            </div>
          )}
        </main>

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} movies={allContent} onMovieSelect={handleContentSelect} />
        <ShowDetails isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} content={selectedContent} onPlayEpisode={handlePlayEpisode} onWatch={handleWatch} />
        <PaviAI isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} onMovieSelect={handleContentSelect} />
      </div>
    </>
  );
};

export default Index;