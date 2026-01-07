import dhurandharBanner from "@/assets/dhurandhar-banner.webp";
import doraemonPoster from "@/assets/doraemon-poster.jfif";
import interstellarBanner from "@/assets/interstellar-banner.webp";
import threeIdiotsPoster from "@/assets/3idiots-poster.jpg";
import tumbbadPoster from "@/assets/tumbbad-poster.jpg";
import doraemonEpisodes from "./doraemonEpisodes.json";

export interface Episode {
  id: number;
  title: string;
  url: string;
}

export interface ContentItem {
  id: string;
  title: string;
  year: string;
  genre: string;
  rating: string;
  poster: string;
  type: "movie" | "series";
  duration?: string;
  episodes?: Episode[];
  overview: string;
  cast?: { name: string; role: string }[];
  crew?: { name: string; role: string }[];
  videoUrl?: string;
}

// Generate episodes from JSON data
const generateDoraemonEpisodes = (): Episode[] => {
  return doraemonEpisodes.map((ep, index) => ({
    id: index + 1,
    title: ep.title,
    url: ep.url,
  }));
};

export const content: ContentItem[] = [
  {
    id: "interstellar",
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi/Adventure",
    rating: "8.7",
    poster: interstellarBanner,
    type: "movie",
    duration: "2h 49m",
    videoUrl: "https://drive.google.com/file/d/141lf8jg81cld_aFAE6ck4YEwVYfG3Bqy/preview",
    overview: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans. Christopher Nolan's epic science fiction film explores themes of love, time, and humanity's survival through stunning visuals and mind-bending physics.",
    cast: [
      { name: "Matthew McConaughey", role: "Joseph Cooper" },
      { name: "Anne Hathaway", role: "Dr. Amelia Brand" },
      { name: "Jessica Chastain", role: "Murphy Cooper" },
      { name: "Michael Caine", role: "Professor Brand" },
      { name: "Matt Damon", role: "Dr. Mann" },
      { name: "Mackenzie Foy", role: "Young Murphy" },
    ],
    crew: [
      { name: "Christopher Nolan", role: "Director" },
      { name: "Hans Zimmer", role: "Music" },
      { name: "Hoyte van Hoytema", role: "Cinematography" },
      { name: "Emma Thomas", role: "Producer" },
    ],
  },
  {
    id: "dhurandhar",
    title: "Dhurandhar",
    year: "2025",
    genre: "Action/Thriller",
    rating: "8.6",
    poster: dhurandharBanner,
    type: "movie",
    duration: "3h 34m",
    videoUrl: "https://drive.google.com/file/d/1FPF1jblO-w-MFxiLjWJ26wsXZtubbRfh/preview",
    overview: "Dhurandhar (transl. Stalwart) is a 2025 Indian Hindi-language spy action thriller film written, co-produced and directed by Aditya Dhar. An underworld saga following a network of criminals, informants and operatives whose lives intersect, navigating covert operations, espionage and betrayals.",
    cast: [
      { name: "Ranveer Singh", role: "Hamza Ali Mazari" },
      { name: "Akshaye Khanna", role: "Rehman Dakait" },
      { name: "Sanjay Dutt", role: "SP Chaudhary Aslam" },
      { name: "R. Madhavan", role: "Ajay Sanyal" },
      { name: "Arjun Rampal", role: "Major Iqbal" },
    ],
    crew: [
      { name: "Aditya Dhar", role: "Director" },
      { name: "Shashwat Sachdev", role: "Music" },
    ],
  },
  {
    id: "3idiots",
    title: "3 Idiots",
    year: "2009",
    genre: "Comedy/Drama",
    rating: "8.4",
    poster: threeIdiotsPoster,
    type: "movie",
    duration: "2h 50m",
    videoUrl: "https://drive.google.com/file/d/1cgzlXHaGm_eWF8AyW7PHKynLbLtqjx8-/preview",
    overview: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them 'idiots'. A heartwarming comedy-drama that challenges the traditional education system while celebrating friendship, passion, and following your dreams.",
    cast: [
      { name: "Aamir Khan", role: "Rancho" },
      { name: "R. Madhavan", role: "Farhan Qureshi" },
      { name: "Sharman Joshi", role: "Raju Rastogi" },
      { name: "Kareena Kapoor", role: "Pia" },
      { name: "Boman Irani", role: "Viru Sahastrabuddhe" },
      { name: "Omi Vaidya", role: "Chatur Ramalingam" },
    ],
    crew: [
      { name: "Rajkumar Hirani", role: "Director" },
      { name: "Shantanu Moitra", role: "Music" },
      { name: "C.K. Muraleedharan", role: "Cinematography" },
      { name: "Vidhu Vinod Chopra", role: "Producer" },
    ],
  },
  {
    id: "tumbbad",
    title: "Tumbbad",
    year: "2018",
    genre: "Horror/Fantasy",
    rating: "8.3",
    poster: tumbbadPoster,
    type: "movie",
    duration: "1h 53m",
    videoUrl: "https://drive.google.com/file/d/1fD8KKQ30xcONi-afIPm_tV0M0Q91sUTu/preview",
    overview: "Tumbbad is a 2018 Indian Hindi-language dark fantasy horror film. A generational tale spanning from 1918 to 1947, it follows a cursed village and a family's obsession with a hidden treasure guarded by a mythological creature. The film combines folklore, greed, and horror in a visually stunning narrative set against the backdrop of colonial India.",
    cast: [
      { name: "Sohum Shah", role: "Vinayak Rao" },
      { name: "Jyoti Malshe", role: "Vinayak's Mother" },
      { name: "Anita Date", role: "Vinayak's Wife" },
      { name: "Ronjini Chakraborty", role: "Narrator" },
      { name: "Mohammad Samad", role: "Pandurang" },
    ],
    crew: [
      { name: "Rahi Anil Barve", role: "Director" },
      { name: "Jesper Kyd", role: "Music" },
      { name: "Pankaj Kumar", role: "Cinematography" },
      { name: "Sohum Shah", role: "Producer" },
    ],
  },
  {
    id: "doraemon",
    title: "Doraemon",
    year: "2005",
    genre: "Animation/Comedy",
    rating: "8.4",
    poster: doraemonPoster,
    type: "series",
    episodes: generateDoraemonEpisodes(),
    overview: "Doraemon is a Japanese manga series written and illustrated by Fujiko F. Fujio. The story revolves around a robotic cat named Doraemon, who travels back in time from the 22nd century to aid a boy named Nobita.",
    cast: [
      { name: "Wasabi Mizuta", role: "Doraemon (Voice)" },
      { name: "Megumi Ohara", role: "Nobita Nobi (Voice)" },
      { name: "Yumi Kakazu", role: "Shizuka (Voice)" },
    ],
  },
];

export const getContentById = (id: string): ContentItem | undefined => {
  return content.find((item) => item.id === id);
};

export const getFeaturedContent = (): ContentItem => {
  return content[0]; // Interstellar as featured
};
