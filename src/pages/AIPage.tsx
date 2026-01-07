import { Helmet } from "react-helmet-async";
import Link from 'next/link';
import { ArrowLeft, BrainCircuit } from "lucide-react";
import PaviAI from "@/components/PaviAI";
import { useState } from "react";
import { useRouter } from 'next/router';

const AIPage = () => {
  const [isAIOpen, setIsAIOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsAIOpen(false);
    router.push("/");
  };

  const handleMovieSelect = (movieId: string) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <>
      <Helmet>
        <title>Pavi AI - Movie Recommendations | PaviStream</title>
        <meta
          name="description"
          content="Get personalized movie and TV show recommendations from Pavi AI. Our AI-powered assistant helps you find the perfect content to watch."
        />
        <link rel="canonical" href="https://pavistream.vercel.app/ai" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {!isAIOpen && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <BrainCircuit className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-4">Pavi AI</h1>
              <button
                onClick={() => setIsAIOpen(true)}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Open Pavi AI
              </button>
              <Link to="/" className="block mt-4 text-muted-foreground hover:text-primary transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        )}

        <PaviAI isOpen={isAIOpen} onClose={handleClose} onMovieSelect={handleMovieSelect} />
      </div>
    </>
  );
};

export default AIPage;
