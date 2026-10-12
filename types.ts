export type CatalogItem = { id: string; name: string; description: string; price: number; currency: string };
export type LineItem = { concept: string; quantity: number; unit_price: number; subtotal: number };
export type Quote = {
  client_name: string; summary: string; line_items: LineItem[]; subtotal_amount: number;
  tax_amount: number; total_amount: number; recommended_next_steps: string;
};
