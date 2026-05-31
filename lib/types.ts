export type ChannelKind = "channel" | "group" | "bot" | "creator";

export type Category = {
  slug: string;
  name: string;
  description: string;
  intent: string;
};

export type DirectoryItem = {
  kind: ChannelKind;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  tags: string[];
  memberCount?: number;
  isNsfw: boolean;
  isAiRelated: boolean;
  qualityScore: number;
  vip?: boolean;
  visual: "aqua" | "violet" | "rose" | "gold" | "steel" | "lime" | "coral" | "indigo";
  telegramUrl: string;
};
