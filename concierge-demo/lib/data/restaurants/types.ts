export type Channel = "instagram_dm" | "google_review";
export type Category =
  | "question"
  | "praise"
  | "complaint"
  | "reservation"
  | "other";

export interface Message {
  id: string;
  channel: Channel;
  author: string;
  content: string;
  receivedAt: string;
  category: Category;
  rating?: number;
}

export interface BrandVoice {
  description: string;
  do: string[];
  dont: string[];
}

export interface RestaurantKnowledge {
  hours: string;
  reservations: string;
  dietary: string;
  cancellation: string;
  privateEvents: string;
  dresscode: string;
  parking: string;
  kids: string;
}

export interface Restaurant {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  brandVoice: BrandVoice;
  knowledge: RestaurantKnowledge;
  messages: Message[];
}
