export const ProviderType = {
  Browser: "Browser",
  JsonRPC: "JsonRPC",
} as const;

export type ProviderType = (typeof ProviderType)[keyof typeof ProviderType];
