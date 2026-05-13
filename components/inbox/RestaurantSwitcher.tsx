"use client";

import { useRouter } from "next/navigation";
import type { Restaurant } from "@/lib/data/restaurants";

interface Props {
  current: string;
  restaurants: Pick<Restaurant, "slug" | "name" | "city" | "tagline">[];
}

export function RestaurantSwitcher({ current, restaurants }: Props) {
  const router = useRouter();

  if (restaurants.length === 1) return null;

  return (
    <select
      value={current}
      onChange={(e) => router.push(`/inbox/${e.target.value}`)}
      className="text-sm border border-stone-200 rounded-md px-2.5 py-1.5 text-stone-600 bg-white focus:outline-none focus:ring-2 focus:ring-stone-300 cursor-pointer"
    >
      {restaurants.map((r) => (
        <option key={r.slug} value={r.slug}>
          {r.name} — {r.city}
        </option>
      ))}
    </select>
  );
}
