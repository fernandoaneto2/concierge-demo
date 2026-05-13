import type { Channel, Category } from "@/lib/data/restaurants";

export function channelLabel(channel: Channel): string {
  return channel === "instagram_dm" ? "Instagram" : "Google";
}

export function categoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    question: "Question",
    praise: "Praise",
    complaint: "Complaint",
    reservation: "Reservation",
    other: "Other",
  };
  return labels[category];
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    }
    return `${diffHours}h ago`;
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
