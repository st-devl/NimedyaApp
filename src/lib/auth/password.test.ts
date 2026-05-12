import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("hashPassword", () => {
  it("returns a string in salt:hash format", () => {
    const stored = hashPassword("mysecret");
    const parts = stored.split(":");
    expect(parts).toHaveLength(2);
    expect(parts[0]).toHaveLength(32); // 16 bytes → 32 hex chars
    expect(parts[1]).toHaveLength(128); // 64 bytes → 128 hex chars
  });

  it("produces different hashes for the same password", () => {
    const a = hashPassword("same");
    const b = hashPassword("same");
    expect(a).not.toBe(b); // different salts
  });
});

describe("verifyPassword", () => {
  it("returns true for the correct password", () => {
    const stored = hashPassword("correct-pass");
    expect(verifyPassword("correct-pass", stored)).toBe(true);
  });

  it("returns false for a wrong password", () => {
    const stored = hashPassword("correct-pass");
    expect(verifyPassword("wrong-pass", stored)).toBe(false);
  });

  it("returns false for an empty stored string", () => {
    expect(verifyPassword("anything", "")).toBe(false);
  });

  it("returns false for a stored string without a colon separator", () => {
    expect(verifyPassword("anything", "noseparator")).toBe(false);
  });

  it("round-trips correctly for various passwords", () => {
    const passwords = ["short", "a".repeat(100), "unicode-ışık", "sp3c!@l#chars"];
    for (const pw of passwords) {
      expect(verifyPassword(pw, hashPassword(pw))).toBe(true);
    }
  });
});
