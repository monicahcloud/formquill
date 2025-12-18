import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export function generateResetToken() {
  // URL-safe enough; we’ll encode in hex
  return randomBytes(32).toString("hex");
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function safeEqualHex(a: string, b: string) {
  // constant-time compare (best effort)
  const ab = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
