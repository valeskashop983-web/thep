import type { Category, DirectoryItem } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "ai-girlfriend",
    name: "AI Girlfriend",
    description: "AI companion bots and roleplay communities with clear safety and disclosure rules.",
    intent: "AI companion discovery"
  },
  {
    slug: "telegram-bots",
    name: "Telegram Bots",
    description: "Automation, AI, productivity and entertainment bots for Telegram.",
    intent: "Bot discovery"
  },
  {
    slug: "telegram-groups",
    name: "Telegram Groups",
    description: "Active group communities organized by topic and language.",
    intent: "Community discovery"
  },
  {
    slug: "creator-channels",
    name: "Creator Channels",
    description: "Creator-led Telegram channels and communities.",
    intent: "Creator discovery"
  },
  {
    slug: "nsfw-telegram",
    name: "NSFW Telegram",
    description: "Adult-oriented Telegram listings with moderation, age-gating and strict safety exclusions.",
    intent: "Adult directory discovery"
  }
];

export const directoryItems: DirectoryItem[] = [
  {
    kind: "bot",
    slug: "luna-ai-companion",
    title: "Luna AI Companion",
    description: "Conversational AI companion bot with roleplay prompts, memory features and premium upsells.",
    categorySlug: "ai-girlfriend",
    tags: ["AI", "Companion", "Roleplay"],
    memberCount: 42800,
    isNsfw: false,
    isAiRelated: true,
    qualityScore: 91,
    vip: true,
    visual: "violet",
    telegramUrl: "https://t.me/example_luna_ai"
  },
  {
    kind: "channel",
    slug: "daily-ai-tools",
    title: "Daily AI Tools",
    description: "Curated AI SaaS launches, workflow prompts and automation tutorials for builders.",
    categorySlug: "telegram-bots",
    tags: ["AI", "SaaS", "Productivity"],
    memberCount: 18600,
    isNsfw: false,
    isAiRelated: true,
    qualityScore: 87,
    visual: "aqua",
    telegramUrl: "https://t.me/example_daily_ai_tools"
  },
  {
    kind: "group",
    slug: "founder-growth-lab",
    title: "Founder Growth Lab",
    description: "Operator-led Telegram group for growth experiments, landing pages and analytics.",
    categorySlug: "telegram-groups",
    tags: ["Startups", "Growth", "Marketing"],
    memberCount: 9700,
    isNsfw: false,
    isAiRelated: false,
    qualityScore: 82,
    visual: "gold",
    telegramUrl: "https://t.me/example_founder_growth"
  },
  {
    kind: "creator",
    slug: "maya-builds",
    title: "Maya Builds",
    description: "Creator channel covering indie apps, no-code systems and launch notes.",
    categorySlug: "creator-channels",
    tags: ["Creator", "Indie", "No-code"],
    memberCount: 6400,
    isNsfw: false,
    isAiRelated: false,
    qualityScore: 78,
    visual: "lime",
    telegramUrl: "https://t.me/example_maya_builds"
  },
  {
    kind: "channel",
    slug: "adult-community-index",
    title: "Adult Community Index",
    description: "Age-restricted adult directory sample with explicit moderation requirements.",
    categorySlug: "nsfw-telegram",
    tags: ["Adult", "Moderated"],
    memberCount: 22100,
    isNsfw: true,
    isAiRelated: false,
    qualityScore: 74,
    vip: true,
    visual: "rose",
    telegramUrl: "https://t.me/example_adult_index"
  },
  {
    kind: "group",
    slug: "private-ai-lounge",
    title: "Private AI Lounge",
    description: "Curated group for AI companion prompts, creator drops and safe roleplay discovery.",
    categorySlug: "ai-girlfriend",
    tags: ["AI", "Private", "Chat"],
    memberCount: 31200,
    isNsfw: false,
    isAiRelated: true,
    qualityScore: 85,
    visual: "indigo",
    telegramUrl: "https://t.me/example_private_ai_lounge"
  },
  {
    kind: "bot",
    slug: "automation-hub-bot",
    title: "Automation Hub Bot",
    description: "Telegram bot hub for workflow automations, alerts and AI-generated summaries.",
    categorySlug: "telegram-bots",
    tags: ["Bot", "Automation"],
    memberCount: 14300,
    isNsfw: false,
    isAiRelated: true,
    qualityScore: 80,
    visual: "steel",
    telegramUrl: "https://t.me/example_automation_hub"
  },
  {
    kind: "channel",
    slug: "verified-adult-radar",
    title: "Verified Adult Radar",
    description: "Adult-oriented discovery sample with verification, removal workflow and clear labels.",
    categorySlug: "nsfw-telegram",
    tags: ["18+", "Verified"],
    memberCount: 50200,
    isNsfw: true,
    isAiRelated: false,
    qualityScore: 76,
    visual: "coral",
    telegramUrl: "https://t.me/example_verified_adult"
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getItemsByCategory(slug: string) {
  return directoryItems
    .filter((item) => item.categorySlug === slug)
    .sort((a, b) => Number(Boolean(b.vip)) - Number(Boolean(a.vip)) || b.qualityScore - a.qualityScore);
}

export function getItem(slug: string) {
  return directoryItems.find((item) => item.slug === slug);
}

export function getItemsByKind(kind: DirectoryItem["kind"]) {
  return directoryItems
    .filter((item) => item.kind === kind)
    .sort((a, b) => b.qualityScore - a.qualityScore);
}
