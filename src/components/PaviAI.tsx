import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, Loader2, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { content } from "@/data/content";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PaviAIProps {
  isOpen: boolean;
  onClose: () => void;
  onMovieSelect: (movieId: string) => void;
}

const GEMINI_API_KEY = "AIzaSyCxaHgIo2LW5yWUt78-6UP1PvPYUhby4BM";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getLibraryContext = () => {
  return content.map((item) => ({
    id: item.id,
    title: item.title,
    year: item.year,
    genre: item.genre,
    rating: item.rating,
    type: item.type,
    duration: item.duration,
    overview: item.overview,
    episodeCount: item.episodes?.length || 0,
  }));
};

const SYSTEM_PROMPT = `You are Pavi AI, a friendly and enthusiastic movie recommendation assistant for PaviStream - a streaming platform created by Pavitra Gupta.

Your current library includes:
${JSON.stringify(getLibraryContext(), null, 2)}

Your personality:
- Friendly, helpful, and passionate about movies and shows
- You speak casually but professionally
- You use occasional emojis to be expressive
- You're knowledgeable about the content in the library

Your capabilities:
- Recommend movies/shows based on user preferences (mood, genre, time available)
- Provide information about content in the library
- Answer questions about PaviStream
- Help users decide what to watch

Important rules:
- Only recommend content that exists in the library
- When recommending, mention the title clearly
- If asked about content not in library, politely explain it's not available yet
- Keep responses concise but helpful (2-4 sentences usually)
- If user wants to watch something, encourage them to click on the suggested title`;

// Declare SpeechRecognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

const PaviAI = ({ isOpen, onClose, onMovieSelect }: PaviAIProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there! 👋 I'm Pavi AI, your movie buddy on PaviStream! What are you in the mood for today? Action, comedy, something mind-bending, or a cozy show to binge?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const conversationHistory = messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      const prompt = `${SYSTEM_PROMPT}\n\nConversation history:\n${conversationHistory}\n\nuser: ${userMessage}\n\nassistant:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text() || "Sorry, I had a little hiccup! Can you try again? 🙈";

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong on my end. Let me try again in a moment! 🔧" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div
        className={cn(
          "w-full max-w-lg h-[600px] max-h-[80vh]",
          "bg-card border border-border rounded-3xl shadow-elevated",
          "flex flex-col overflow-hidden animate-scale-in"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Pavi AI</h2>
              <p className="text-xs text-muted-foreground">Your movie recommendation buddy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] px-4 py-3 rounded-2xl text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md prose prose-sm dark:prose-invert max-w-none",
                  "[&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_strong]:text-foreground [&_code]:bg-background/50 [&_code]:px-1 [&_code]:rounded"
                )}
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                "transition-all duration-200",
                isListening 
                  ? "bg-destructive text-destructive-foreground animate-pulse" 
                  : "bg-muted hover:bg-muted/80 text-foreground",
                !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && "opacity-50 cursor-not-allowed"
              )}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me for movie recommendations..."
              className={cn(
                "flex-1 px-4 py-3 rounded-xl text-sm",
                "bg-muted text-foreground placeholder:text-muted-foreground",
                "border border-border focus:border-primary focus:outline-none",
                "transition-colors"
              )}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                "bg-gradient-primary text-primary-foreground",
                "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200 shadow-glow"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {isListening ? "🎤 Listening... Speak now!" : "Powered by Google Gemini ✨"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaviAI;
