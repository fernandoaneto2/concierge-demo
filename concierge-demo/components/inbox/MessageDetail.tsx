"use client";

import { useState, useEffect, useTransition } from "react";
import type { Message, Restaurant } from "@/lib/data/restaurants";
import { generateReply } from "@/lib/actions/generateReply";
import { Button } from "@/components/ui/button";
import { ChannelBadge, CategoryBadge } from "./MessageList";
import { formatRelativeTime } from "@/lib/utils/format";
import { CheckCircle, RefreshCw } from "lucide-react";

interface Props {
  message: Message;
  restaurant: Restaurant;
}

type DraftState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; text: string }
  | { status: "editing"; text: string }
  | { status: "sent" }
  | { status: "error"; error: string };

export function MessageDetail({ message, restaurant }: Props) {
  const [draft, setDraft] = useState<DraftState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  function generate() {
    setDraft({ status: "loading" });
    startTransition(async () => {
      const result = await generateReply({
        restaurantSlug: restaurant.slug,
        messageId: message.id,
      });
      if (result.success) {
        setDraft({ status: "ready", text: result.reply });
      } else {
        setDraft({ status: "error", error: result.error });
      }
    });
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id]);

  const currentText =
    draft.status === "ready" || draft.status === "editing"
      ? draft.text
      : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Original message */}
      <div className="px-6 py-5 border-b border-stone-200 bg-white shrink-0">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <ChannelBadge channel={message.channel} />
          <CategoryBadge category={message.category} />
          {message.rating !== undefined && (
            <span className="text-xs text-amber-500">
              {"★".repeat(message.rating)}
              <span className="text-stone-300">
                {"★".repeat(5 - message.rating)}
              </span>
            </span>
          )}
          <span className="text-xs text-stone-400 ml-auto">
            {formatRelativeTime(message.receivedAt)}
          </span>
        </div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
          {message.author}
        </p>
        <p className="text-sm text-stone-700 leading-relaxed">{message.content}</p>
      </div>

      {/* Draft area */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
            AI Draft
          </p>
          {(draft.status === "ready" || draft.status === "editing" || draft.status === "error") && (
            <button
              onClick={generate}
              disabled={isPending}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-600 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={11} className={isPending ? "animate-spin" : ""} />
              Regenerate
            </button>
          )}
        </div>

        {draft.status === "loading" && (
          <div className="space-y-2.5">
            <div className="h-3.5 bg-stone-200 rounded-full animate-pulse w-full" />
            <div className="h-3.5 bg-stone-200 rounded-full animate-pulse w-11/12" />
            <div className="h-3.5 bg-stone-200 rounded-full animate-pulse w-4/5" />
            <div className="h-3.5 bg-stone-200 rounded-full animate-pulse w-9/12" />
            <div className="h-3.5 bg-stone-200 rounded-full animate-pulse w-2/3" />
          </div>
        )}

        {draft.status === "error" && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {draft.error}
          </div>
        )}

        {(draft.status === "ready" || draft.status === "editing") && (
          <textarea
            className="w-full min-h-52 text-sm text-stone-700 leading-relaxed bg-white border border-stone-200 rounded-xl px-4 py-3.5 resize-none focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all placeholder:text-stone-300"
            value={draft.text}
            readOnly={draft.status === "ready"}
            onChange={(e) =>
              setDraft({ status: "editing", text: e.target.value })
            }
            onClick={() => {
              if (draft.status === "ready") {
                setDraft({ status: "editing", text: draft.text });
              }
            }}
            placeholder="Draft will appear here…"
          />
        )}

        {draft.status === "ready" && (
          <p className="text-xs text-stone-400 mt-2">
            Click the draft to edit before sending.
          </p>
        )}

        {draft.status === "sent" && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 flex items-center gap-3">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-800">Reply sent</p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Your message has been delivered to {message.author}.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      {(draft.status === "ready" || draft.status === "editing") && (
        <div className="px-6 py-4 border-t border-stone-200 bg-white flex items-center gap-2.5 shrink-0">
          <Button
            className="bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-white text-sm px-5 h-9 rounded-lg font-medium shadow-sm"
            onClick={() => setDraft({ status: "sent" })}
          >
            Approve &amp; Send
          </Button>
          {draft.status === "ready" && (
            <Button
              variant="outline"
              className="text-sm px-5 h-9 rounded-lg border-stone-200 text-stone-600 hover:bg-stone-50 font-medium"
              onClick={() =>
                setDraft({ status: "editing", text: draft.text })
              }
            >
              Edit
            </Button>
          )}
          {draft.status === "editing" && (
            <span className="text-xs text-stone-400 ml-1">
              Editing — approve when ready
            </span>
          )}
        </div>
      )}
    </div>
  );
}
