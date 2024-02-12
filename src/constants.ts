export type Stage = "dev" | "prod";

export const ALLOWED_ORIGINS: Record<Stage, string[]> = {
  dev: ["http://localhost:3000"],
  prod: ["https://www.example.com", "https://example.com"],
};
