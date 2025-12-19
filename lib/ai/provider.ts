export type AiProvider = {
  generateJSON(prompt: string): Promise<unknown>;
};
