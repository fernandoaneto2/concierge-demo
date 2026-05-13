import { notFound } from "next/navigation";
import { getRestaurant, listRestaurants } from "@/lib/data/restaurants";
import { InboxShell } from "@/components/inbox/InboxShell";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InboxPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();

  return <InboxShell restaurant={restaurant} allRestaurants={listRestaurants()} />;
}
