"use server";

import { getRestaurant } from "@/lib/data/restaurants";
import type { Restaurant, Message } from "@/lib/data/restaurants";

interface GenerateReplyInput {
  restaurantSlug: string;
  messageId: string;
}

type GenerateReplyResult =
  | { success: true; reply: string }
  | { success: false; error: string };

export async function generateReply(
  input: GenerateReplyInput
): Promise<GenerateReplyResult> {
  const restaurant = getRestaurant(input.restaurantSlug);
  if (!restaurant) {
    return { success: false, error: "Restaurant not found." };
  }

  const message = restaurant.messages.find((m) => m.id === input.messageId);
  if (!message) {
    return { success: false, error: "Message not found." };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { success: false, error: "API key not configured." };
  }

  const systemPrompt = buildSystemPrompt(restaurant);
  const userPrompt = buildUserPrompt(message);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return { success: false, error: "Failed to generate reply. Please try again." };
    }

    const data = (await response.json()) as {
      content: { type: string; text: string }[];
    };

    const text = data.content.find((c) => c.type === "text")?.text ?? "";
    return { success: true, reply: text.trim() };
  } catch (err) {
    console.error("generateReply error:", err);
    return { success: false, error: "Network error. Please try again." };
  }
}

function buildSystemPrompt(restaurant: Restaurant): string {
  const { brandVoice, knowledge, name } = restaurant;

  return `You are the social media and guest communications manager for ${name}, a boutique restaurant.

BRAND VOICE
${brandVoice.description}

DO:
${brandVoice.do.map((d) => `- ${d}`).join("\n")}

DO NOT:
${brandVoice.dont.map((d) => `- ${d}`).join("\n")}

RESTAURANT KNOWLEDGE
Hours: ${knowledge.hours}
Reservations: ${knowledge.reservations}
Dietary accommodations: ${knowledge.dietary}
Cancellation policy: ${knowledge.cancellation}
Private events: ${knowledge.privateEvents}
Dress code: ${knowledge.dresscode}
Parking: ${knowledge.parking}
Kids: ${knowledge.kids}

TASK
Draft a reply to the guest message below. Write only the reply text — no subject line, no metadata, no explanation. The reply should be ready to copy and send as-is.`;
}

function buildUserPrompt(message: Message): string {
  const channelContext =
    message.channel === "instagram_dm"
      ? "This is a direct message on Instagram."
      : `This is a Google review with a ${message.rating}-star rating.`;

  return `${channelContext}

From: ${message.author}
Message: ${message.content}`;
}
