"use client";

import { useState } from "react";
import type { Restaurant, Message } from "@/lib/data/restaurants";
import { MessageList } from "./MessageList";
import { MessageDetail } from "./MessageDetail";
import { RestaurantSwitcher } from "./RestaurantSwitcher";
import { ArrowLeft } from "lucide-react";

interface Props {
  restaurant: Restaurant;
  allRestaurants: Pick<Restaurant, "slug" | "name" | "city" | "tagline">[];
}

export function InboxShell({ restaurant, allRestaurants }: Props) {
  const [selected, setSelected] = useState<Message | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  function handleSelect(message: Message) {
    setSelected(message);
    setMobileView("detail");
  }

  function handleBack() {
    setMobileView("list");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-white shrink-0">
        <div className="flex items-center gap-3">
          {mobileView === "detail" && selected ? (
            <button
              onClick={handleBack}
              className="md:hidden flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors mr-1"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Inbox</span>
            </button>
          ) : (
            <span className="font-display text-lg font-semibold tracking-tight text-stone-800">
              Concierge
            </span>
          )}
          <span className="hidden md:inline text-stone-300 text-sm">·</span>
          <span className="hidden md:inline text-stone-500 text-sm">
            {restaurant.name}
          </span>
          {mobileView === "detail" && selected && (
            <span className="md:hidden text-sm font-medium text-stone-700 truncate max-w-[180px]">
              {selected.author}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {mobileView === "list" && (
            <span className="text-xs text-stone-400 hidden sm:inline">
              {restaurant.messages.length} messages
            </span>
          )}
          <RestaurantSwitcher
            current={restaurant.slug}
            restaurants={allRestaurants}
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={[
            "w-full md:w-80 lg:w-96 border-r border-stone-200 bg-white flex flex-col overflow-hidden shrink-0",
            mobileView === "detail" ? "hidden md:flex" : "flex",
          ].join(" ")}
        >
          <MessageList
            messages={restaurant.messages}
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
          />
        </aside>

        <main
          className={[
            "flex-1 flex flex-col overflow-hidden bg-stone-50",
            mobileView === "list" ? "hidden md:flex" : "flex",
          ].join(" ")}
        >
          {selected ? (
            <MessageDetail
              key={selected.id}
              message={selected}
              restaurant={restaurant}
            />
          ) : (
            <EmptyState restaurantName={restaurant.name} />
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState({ restaurantName }: { restaurantName: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center px-8 gap-3">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-1">
        <span className="text-xl">✦</span>
      </div>
      <p className="font-display text-xl text-stone-400 font-medium">
        Select a message
      </p>
      <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
        Choose a guest message from the inbox to draft a reply in{" "}
        {restaurantName}&apos;s voice.
      </p>
    </div>
  );
}
