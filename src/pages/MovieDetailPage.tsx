import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Star, Clock, Calendar, Users, Film } from "lucide-react";
import { getContentById } from "@/data/content";
import AdsterraAd from "@/components/AdsterraAd";
import VideoPlayer from "@/components/VideoPlayer";
import { useState } from "react";

const MovieDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const movie = getContentById(id || "");
  const [isPlaying, setIsPlaying] = useState(false);

  if (!movie || movie.type !== "movie") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Movie Not Found</h1>
          <p className="text-muted-foreground mb-4">The movie you're looking for doesn't exist.</p>
          <Link to="/movies" className="text-primary hover:underline">← Back to Movies</Link>
        </div>
      </div>
    );
  }

  if (isPlaying && movie.videoUrl) {
    return (
      <VideoPlayer
        onBack={() => setIsPlaying(false)}
        title={movie.title}
        subtitle={`(${movie.year})`}
        videoUrl={movie.videoUrl}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{movie.title} ({movie.year}) - Watch Free HD | PaviStream</title>
        <meta
          name="description"
          content={`Watch ${movie.title} (${movie.year}) in HD on PaviStream. ${movie.overview.substring(0, 150)}...`}
        />
        <meta name="keywords" content={`watch ${movie.title}, ${movie.title} HD, ${movie.title} free, ${movie.genre}, PaviStream`} />
        <link rel="canonical" href={`https://pavistream.vercel.app/movies/${movie.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${movie.title} (${movie.year}) - PaviStream`} />
        <meta property="og:description" content={movie.overview.substring(0, 200)} />
        <meta property="og:image" content={movie.poster} />
        <meta property="og:type" content="video.movie" />
        
        {/* Schema.org Movie markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": movie.title,
            "datePublished": movie.year,
            "genre": movie.genre,
            "description": movie.overview,
            "image": movie.poster,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": movie.rating,
              "bestRating": "10"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute top-4 left-4 z-10">
            <Link
              to="/movies"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>

        {/* Content */}
        <main className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {movie.rating}/10
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.year}
              </span>
              {movie.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.duration}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {movie.genre}
              </span>
            </div>

            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity mb-8"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </button>

            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
            </div>

            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Cast
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {movie.cast.map((person, index) => (
                    <div key={index} className="p-3 rounded-lg bg-card border border-border">
                      <p className="font-medium text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.crew && movie.crew.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">Crew</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {movie.crew.map((person, index) => (
                    <div key={index} className="p-3 rounded-lg bg-card border border-border">
                      <p className="font-medium text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
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

export default MovieDetailPage;
