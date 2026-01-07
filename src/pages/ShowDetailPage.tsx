import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Star, Calendar, Users, Tv, List } from "lucide-react";
import { getContentById, Episode } from "@/data/content";
import AdsterraAd from "@/components/AdsterraAd";
import VideoPlayer from "@/components/VideoPlayer";
import { useState } from "react";

const ShowDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const show = getContentById(id || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  if (!show || show.type !== "series") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Tv className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Show Not Found</h1>
          <p className="text-muted-foreground mb-4">The show you're looking for doesn't exist.</p>
          <Link to="/shows" className="text-primary hover:underline">← Back to Shows</Link>
        </div>
      </div>
    );
  }

  const handlePlayEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  if (isPlaying && currentEpisode) {
    return (
      <VideoPlayer
        onBack={() => setIsPlaying(false)}
        title={show.title}
        subtitle={currentEpisode.title}
        videoUrl={currentEpisode.url}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{show.title} - Watch All Episodes Free | PaviStream</title>
        <meta
          name="description"
          content={`Watch all ${show.episodes?.length || 0} episodes of ${show.title} in HD on PaviStream. ${show.overview.substring(0, 120)}...`}
        />
        <meta name="keywords" content={`watch ${show.title}, ${show.title} episodes, ${show.title} HD, ${show.genre}, PaviStream`} />
        <link rel="canonical" href={`https://pavistream.vercel.app/shows/${show.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${show.title} - PaviStream`} />
        <meta property="og:description" content={show.overview.substring(0, 200)} />
        <meta property="og:image" content={show.poster} />
        <meta property="og:type" content="video.tv_show" />
        
        {/* Schema.org TVSeries markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TVSeries",
            "name": show.title,
            "datePublished": show.year,
            "genre": show.genre,
            "description": show.overview,
            "image": show.poster,
            "numberOfEpisodes": show.episodes?.length || 0,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": show.rating,
              "bestRating": "10"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={show.poster}
            alt={show.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute top-4 left-4 z-10">
            <Link
              to="/shows"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>

        {/* Content */}
        <main className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {show.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {show.rating}/10
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {show.year}
              </span>
              <span className="flex items-center gap-1">
                <List className="w-4 h-4" />
                {show.episodes?.length || 0} Episodes
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {show.genre}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{show.overview}</p>
            </div>

            {show.cast && show.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Cast
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {show.cast.map((person, index) => (
                    <div key={index} className="p-3 rounded-lg bg-card border border-border">
                      <p className="font-medium text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Episodes */}
            {show.episodes && show.episodes.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <List className="w-5 h-5" />
                  Episodes ({show.episodes.length})
                </h2>
                <div className="grid gap-2 max-h-96 overflow-y-auto custom-scrollbar">
                  {show.episodes.map((episode) => (
                    <button
                      key={episode.id}
                      onClick={() => handlePlayEpisode(episode)}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          Episode {episode.id}
                        </p>
                        <p className="text-sm text-muted-foreground">{episode.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <AdsterraAd />
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-12">
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

export default ShowDetailPage;
