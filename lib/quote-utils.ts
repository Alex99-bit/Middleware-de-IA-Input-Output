import type { LineItem, Quote } from "@/types";

export function calculateTotals(lineItems: LineItem[], taxRate = 0.16) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const tax = subtotal * taxRate;
  return { subtotal_amount: subtotal, tax_amount: tax, total_amount: subtotal + tax };
}

export function normalizeQuote(quote: Quote): Quote {
  const line_items = quote.line_items.map((item) => ({
    ...item,
    quantity: Math.max(1, Math.round(item.quantity)),
    unit_price: Number(item.unit_price),
  })).map((item) => ({ ...item, subtotal: item.quantity * item.unit_price }));
  return { ...quote, line_items, ...calculateTotals(line_items) };
}
