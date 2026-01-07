import { ArrowLeft, Maximize, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  onBack: () => void;
  title: string;
  subtitle?: string;
  videoUrl: string;
}

const VideoPlayer = ({ onBack, title, subtitle, videoUrl }: VideoPlayerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-background via-background/80 to-transparent">
        <button
          onClick={onBack}
          className={cn("flex items-center gap-2 px-4 py-2 rounded-xl", "glass hover:bg-muted/50 transition-all duration-300")}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <h1 className="font-display text-lg md:text-xl font-semibold">{title}</h1>
          {subtitle && <span className="text-muted-foreground text-sm">{subtitle}</span>}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg glass hover:bg-muted/50 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg glass hover:bg-muted/50 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoPlayer;
