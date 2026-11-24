import { describe, expect, it } from "vitest";
import { DEFAULT_CURRENCY, formatCurrency, isCurrencyCode } from "./currency";

describe("currency", () => {
  it("formats amounts using the selected ISO currency code", () => {
    expect(formatCurrency(1234.5, "MXN")).toContain("MXN");
    expect(formatCurrency(1234.5, "EUR")).toContain("EUR");
    expect(formatCurrency(1234.5, "GBP")).toContain("GBP");
  });

  it("defaults to USD and rejects unsupported codes", () => {
    expect(formatCurrency(100)).toBe(formatCurrency(100, DEFAULT_CURRENCY));
    expect(isCurrencyCode("USD")).toBe(true);
    expect(isCurrencyCode("ABC")).toBe(false);
  });
});
