/** Servicio disponible en el catálogo comercial de un workspace. */
export type CatalogItem = { id: string; name: string; description: string; price: number; currency: string };
/** Concepto individual y sus importes dentro de una cotización. */
export type LineItem = { concept: string; quantity: number; unit_price: number; subtotal: number };
/** Contrato canónico compartido entre la IA, la interfaz y el PDF. */
export type Quote = {
  client_name: string; summary: string; line_items: LineItem[]; subtotal_amount: number;
  tax_amount: number; total_amount: number; recommended_next_steps: string;
};
