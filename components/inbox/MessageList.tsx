"use client";

import { useState } from "react";
import type { Message, Channel, Category } from "@/lib/data/restaurants";
import { Badge } from "@/components/ui/badge";
import {
  channelLabel,
  categoryLabel,
  formatRelativeTime,
} from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface Props {
  messages: Message[];
  selectedId: string | null;
  onSelect: (message: Message) => void;
}

const CHANNELS: { value: Channel | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "instagram_dm", label: "Instagram" },
  { value: "google_review", label: "Google" },
];

const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "question", label: "Questions" },
  { value: "praise", label: "Praise" },
  { value: "complaint", label: "Complaints" },
  { value: "reservation", label: "Reservations" },
];

export function MessageList({ messages, selectedId, onSelect }: Props) {
  const [channelFilter, setChannelFilter] = useState<Channel | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  const filtered = messages.filter((m) => {
    if (channelFilter !== "all" && m.channel !== channelFilter) return false;
    if (categoryFilter !== "all" && m.category !== categoryFilter) return false;
    return true;
  });

  return (
    <>
      <div className="px-4 pt-4 pb-3 space-y-2.5 border-b border-stone-100 shrink-0">
        <div>
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1.5 px-0.5">
            Channel
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {CHANNELS.map((c) => (
              <FilterChip
                key={c.value}
                active={channelFilter === c.value}
                onClick={() =>
                  setChannelFilter(c.value as Channel | "all")
                }
              >
                {c.label}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1.5 px-0.5">
            Category
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.value}
                active={categoryFilter === c.value}
                onClick={() =>
                  setCategoryFilter(c.value as Category | "all")
                }
              >
                {c.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
        {filtered.length === 0 && (
          <p className="text-sm text-stone-400 text-center py-12 px-4">
            No messages match these filters.
          </p>
        )}
        {filtered.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            selected={message.id === selectedId}
            onClick={() => onSelect(message)}
          />
        ))}
      </div>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium transition-all",
        active
          ? "bg-stone-800 text-white shadow-sm"
          : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
      )}
    >
      {children}
    </button>
  );
}

function MessageRow({
  message,
  selected,
  onClick,
}: {
  message: Message;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stone-300",
        selected
          ? "bg-stone-50 border-l-2 border-l-stone-700"
          : "hover:bg-stone-50 border-l-2 border-l-transparent"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-sm font-semibold text-stone-800 truncate leading-tight">
          {message.author}
        </span>
        <span className="text-[11px] text-stone-400 shrink-0 tabular-nums pt-px">
          {formatRelativeTime(message.receivedAt)}
        </span>
      </div>
      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-2.5">
        {message.content}
      </p>
      <div className="flex items-center gap-1.5 flex-wrap">
        <ChannelBadge channel={message.channel} />
        <CategoryBadge category={message.category} />
        {message.rating !== undefined && (
          <span className="text-[10px] text-amber-500 tracking-tight">
            {"★".repeat(message.rating)}
            <span className="text-stone-300">
              {"★".repeat(5 - message.rating)}
            </span>
          </span>
        )}
      </div>
    </button>
  );
}

export function ChannelBadge({ channel }: { channel: Channel }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] px-1.5 py-0 h-4 font-medium rounded",
        channel === "instagram_dm"
          ? "border-purple-200 text-purple-600 bg-purple-50"
          : "border-blue-200 text-blue-600 bg-blue-50"
      )}
    >
      {channelLabel(channel)}
    </Badge>
  );
}

export function CategoryBadge({ category }: { category: Category }) {
  const styles: Record<Category, string> = {
    question: "border-amber-200 text-amber-700 bg-amber-50",
    praise: "border-emerald-200 text-emerald-700 bg-emerald-50",
    complaint: "border-red-200 text-red-600 bg-red-50",
    reservation: "border-sky-200 text-sky-700 bg-sky-50",
    other: "border-stone-200 text-stone-500 bg-stone-50",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] px-1.5 py-0 h-4 font-medium rounded",
        styles[category]
      )}
    >
      {categoryLabel(category)}
    </Badge>
  );
}
