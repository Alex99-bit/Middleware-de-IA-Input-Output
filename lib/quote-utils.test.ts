import { describe, expect, it } from "vitest";
import { calculateTotals, normalizeQuote } from "./quote-utils";

describe("quote utils", () => {
  it("calculates subtotal, tax and total from line items", () => {
    expect(calculateTotals([
      { concept: "CRM", quantity: 2, unit_price: 100, subtotal: 0 },
      { concept: "Soporte", quantity: 1, unit_price: 50, subtotal: 0 },
    ])).toEqual({ subtotal_amount: 250, tax_amount: 40, total_amount: 290 });
  });

  it("normalizes quantities and prevents stale AI totals", () => {
    const quote = normalizeQuote({
      client_name: "Acme", summary: "Resumen", recommended_next_steps: "Llamar",
      line_items: [{ concept: "Consultoría", quantity: 1.6, unit_price: 180, subtotal: 999 }],
      subtotal_amount: 999, tax_amount: 999, total_amount: 999,
    });
    expect(quote.line_items[0].quantity).toBe(2);
    expect(quote.line_items[0].subtotal).toBe(360);
    expect(quote.total_amount).toBe(417.6);
  });
});
