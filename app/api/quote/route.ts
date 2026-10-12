import { NextResponse } from "next/server";
import { normalizeQuote } from "@/lib/quote-utils";

const responseSchema = {
  type: "OBJECT",
  properties: {
    client_name: { type: "STRING" },
    summary: { type: "STRING" },
    line_items: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          concept: { type: "STRING" }, quantity: { type: "INTEGER" },
          unit_price: { type: "NUMBER" }, subtotal: { type: "NUMBER" },
        },
        required: ["concept", "quantity", "unit_price", "subtotal"],
      },
    },
    subtotal_amount: { type: "NUMBER" }, tax_amount: { type: "NUMBER" },
    total_amount: { type: "NUMBER" }, recommended_next_steps: { type: "STRING" },
  },
  required: ["client_name", "summary", "line_items", "subtotal_amount", "tax_amount", "total_amount", "recommended_next_steps"],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.request?.trim() || !Array.isArray(body.catalog)) return NextResponse.json({ error: "request y catalog son requeridos" }, { status: 400 });
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "GEMINI_API_KEY no configurada" }, { status: 503 });
    const catalog = body.catalog.map((item: { name: string; description: string; price: number; currency: string }) => `${item.name} | ${item.description} | ${item.price} ${item.currency}`).join("\n");
    const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: "Eres un motor experto en análisis comercial y cotizaciones B2B. Lee una solicitud desestructurada y crúzala exclusivamente con el catálogo entregado. Si no se menciona el cliente usa Cliente Potencial. No inventes servicios ni precios. Calcula subtotales, subtotal_amount, tax_amount con IVA de 16% y total_amount. Resume en exactamente 2 oraciones." }] },
        contents: [{ role: "user", parts: [{ text: `CATÁLOGO DISPONIBLE:\n${catalog}\n\nSOLICITUD DEL CLIENTE:\n${body.request}` }] }],
        generationConfig: { temperature: 0.1, responseMimeType: "application/json", responseSchema },
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("gemini_api_error", response.status, data.error?.message || "unknown error");
      return NextResponse.json({ error: "Error del proveedor de IA", detail: data.error?.message }, { status: 502 });
    }
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) return NextResponse.json({ error: "La IA no devolvió una cotización" }, { status: 502 });
    return NextResponse.json(normalizeQuote(JSON.parse(content)));
  } catch (error) {
    console.error("quote_api_error", error);
    return NextResponse.json({ error: "No se pudo procesar la solicitud" }, { status: 500 });
  }
}
