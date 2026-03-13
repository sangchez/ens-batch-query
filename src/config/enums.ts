export const ProviderType = {
  Browser: 0,
  JsonRPC: 1,
} as const;

export type ProviderType = (typeof ProviderType)[keyof typeof ProviderType];
