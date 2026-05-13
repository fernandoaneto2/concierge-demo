import { friskyOyster } from "./frisky-oyster";
import type { Restaurant } from "./types";

export const restaurants: Record<string, Restaurant> = {
  "frisky-oyster": friskyOyster,
};

export function getRestaurant(slug: string): Restaurant | undefined {
  return restaurants[slug];
}

export function listRestaurants(): Pick<
  Restaurant,
  "slug" | "name" | "city" | "tagline"
>[] {
  return Object.values(restaurants).map(({ slug, name, city, tagline }) => ({
    slug,
    name,
    city,
    tagline,
  }));
}

export type { Restaurant, Message, Channel, Category } from "./types";
