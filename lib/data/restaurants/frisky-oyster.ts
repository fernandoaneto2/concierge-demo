import type { Restaurant } from "./types";

export const friskyOyster: Restaurant = {
  slug: "frisky-oyster",
  name: "The Frisky Oyster",
  city: "Greenport, NY",
  tagline: "Where the North Fork meets the sea.",
  brandVoice: {
    description:
      "Refined yet warm, coastal-sophisticated with a playful undercurrent. We write like a knowledgeable friend who happens to run the best table on the North Fork — never stiff, never fussy, never fake-casual.",
    do: [
      "Use first names when provided",
      "Acknowledge specific details from their message to show we actually read it",
      "Keep responses concise — two short paragraphs max",
      "End with a natural, warm close that feels personal not scripted",
      "When mentioning food or wine, be specific and evocative",
    ],
    dont: [
      "Never say 'Absolutely!' or 'Of course!' or 'Great question!'",
      "Never use exclamation points more than once per message",
      "Never be apologetic or defensive about our prices or policies",
      "Never say 'We strive to...' or 'Our team is committed to...'",
      "Never sign off with 'Best regards' or 'Sincerely'",
    ],
  },
  knowledge: {
    hours:
      "Tuesday–Sunday, 5pm–10pm. Closed Monday. Bar opens at 4:30pm for walk-ins.",
    reservations:
      "Reservations strongly recommended, especially Friday–Sunday. Book via Resy or call us at (631) 477-4265. Walk-ins welcome at the bar and for parties of 2 on weeknights when available.",
    dietary:
      "Our menu changes seasonally. We accommodate most dietary needs with advance notice — vegetarian, vegan, gluten-free options available. Shellfish is central to our identity; not ideal for severe shellfish allergies.",
    cancellation:
      "We kindly ask for 24-hour notice for cancellations. No-shows on weekend reservations of 4+ may be charged a $25/person fee.",
    privateEvents:
      "We host private dinners for groups of 12–40. Full buyouts available on select Mondays. Contact hello@friskyoyster.com for custom menus and pricing.",
    dresscode:
      "Smart casual. Come as you are after a day on the water — just maybe not dripping.",
    parking:
      "Street parking on Front Street. Town lot on Third Street is a two-minute walk and usually available.",
    kids:
      "Children are welcome. We don't have a dedicated kids' menu, but our kitchen is happy to accommodate simple requests. High chairs available.",
  },
  messages: [
    {
      id: "msg-001",
      channel: "instagram_dm",
      author: "caitlin_eats_lny",
      content:
        "Hi! Do you have availability for 4 people this Saturday around 7pm? It's my husband's birthday and we'd love to celebrate somewhere special.",
      receivedAt: "2025-05-10T14:23:00Z",
      category: "reservation",
    },
    {
      id: "msg-002",
      channel: "google_review",
      author: "Marcus T.",
      content:
        "Absolutely phenomenal meal from start to finish. The raw bar selection was pristine — we did the oyster flight and every single one was perfect. Our server (I think her name was Jess?) was knowledgeable without being pretentious. The roasted beet salad converted my partner who 'doesn't like beets.' This place is the real deal.",
      receivedAt: "2025-05-09T20:45:00Z",
      category: "praise",
      rating: 5,
    },
    {
      id: "msg-003",
      channel: "instagram_dm",
      author: "hamptons_foodie",
      content:
        "Hey — quick question. Do you do anything for gluten free guests? My sister is celiac and we're planning a trip out east next month.",
      receivedAt: "2025-05-09T11:10:00Z",
      category: "question",
    },
    {
      id: "msg-004",
      channel: "google_review",
      author: "Diane R.",
      content:
        "We had a reservation for 6:30 on Friday and were seated 25 minutes late with no apology. Once we were finally at the table the food was good but the wait really soured the start of our anniversary dinner. Expected better given the prices.",
      receivedAt: "2025-05-08T22:14:00Z",
      category: "complaint",
      rating: 3,
    },
    {
      id: "msg-005",
      channel: "instagram_dm",
      author: "northfork_weekend",
      content:
        "Is parking crazy on weekends? Planning to drive out from Brooklyn and a little nervous about finding a spot near the restaurant.",
      receivedAt: "2025-05-08T09:30:00Z",
      category: "question",
    },
    {
      id: "msg-006",
      channel: "google_review",
      author: "Jonathan L.",
      content:
        "The tasting menu was a highlight of our whole summer. Chef's crab bisque alone was worth the drive from the city. Wine pairings were thoughtful — not just 'here's whatever's open.' Already planning our fall visit.",
      receivedAt: "2025-05-07T19:55:00Z",
      category: "praise",
      rating: 5,
    },
    {
      id: "msg-007",
      channel: "instagram_dm",
      author: "events_by_simone",
      content:
        "Hello! I'm an event planner and have a client looking to host a private birthday dinner for about 20 guests sometime in June. Do you do private events? Would love to connect.",
      receivedAt: "2025-05-07T15:40:00Z",
      category: "reservation",
    },
    {
      id: "msg-008",
      channel: "google_review",
      author: "Priya M.",
      content:
        "Lovely spot with beautiful ambiance but our entrees took nearly 45 minutes after the appetizers were cleared. The scallops were worth the wait, honestly, but the pacing felt off. Would still return — just maybe on a quieter night.",
      receivedAt: "2025-05-06T21:30:00Z",
      category: "complaint",
      rating: 3,
    },
    {
      id: "msg-009",
      channel: "instagram_dm",
      author: "oyster_obsessed_",
      content:
        "What oyster varieties are you usually serving right now? We're huge raw bar fans and trying to plan our visit around peak season.",
      receivedAt: "2025-05-06T10:15:00Z",
      category: "question",
    },
    {
      id: "msg-010",
      channel: "google_review",
      author: "Tom & Rachel B.",
      content:
        "Our 10th anniversary dinner exceeded every expectation. The staff made us feel genuinely celebrated — not just like another table. The duck confit and the honey panna cotta are dishes we're still talking about weeks later. This is now our annual tradition spot.",
      receivedAt: "2025-05-05T20:10:00Z",
      category: "praise",
      rating: 5,
    },
  ],
};
