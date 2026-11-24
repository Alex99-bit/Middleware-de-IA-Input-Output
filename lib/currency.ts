export const DEFAULT_CURRENCY = "USD";

export const CURRENCY_OPTIONS = [
  { code: "USD", label: "Dólar estadounidense" },
  { code: "MXN", label: "Peso mexicano" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "Libra esterlina" },
  { code: "CAD", label: "Dólar canadiense" },
  { code: "AUD", label: "Dólar australiano" },
  { code: "NZD", label: "Dólar neozelandés" },
  { code: "JPY", label: "Yen japonés" },
  { code: "CNY", label: "Yuan chino" },
  { code: "INR", label: "Rupia india" },
  { code: "CHF", label: "Franco suizo" },
  { code: "BRL", label: "Real brasileño" },
  { code: "ARS", label: "Peso argentino" },
  { code: "COP", label: "Peso colombiano" },
  { code: "CLP", label: "Peso chileno" },
  { code: "PEN", label: "Sol peruano" },
  { code: "UYU", label: "Peso uruguayo" },
  { code: "CRC", label: "Colón costarricense" },
  { code: "GTQ", label: "Quetzal guatemalteco" },
  { code: "DOP", label: "Peso dominicano" },
  { code: "BOB", label: "Boliviano" },
  { code: "PYG", label: "Guaraní paraguayo" },
  { code: "KRW", label: "Won surcoreano" },
  { code: "SGD", label: "Dólar singapurense" },
  { code: "HKD", label: "Dólar hongkonés" },
  { code: "TWD", label: "Nuevo dólar taiwanés" },
  { code: "THB", label: "Baht tailandés" },
  { code: "IDR", label: "Rupia indonesia" },
  { code: "MYR", label: "Ringgit malasio" },
  { code: "PHP", label: "Peso filipino" },
  { code: "VND", label: "Dong vietnamita" },
  { code: "AED", label: "Dírham de Emiratos Árabes Unidos" },
  { code: "SAR", label: "Riyal saudí" },
  { code: "ILS", label: "Nuevo séquel israelí" },
  { code: "TRY", label: "Lira turca" },
  { code: "ZAR", label: "Rand sudafricano" },
  { code: "EGP", label: "Libra egipcia" },
  { code: "SEK", label: "Corona sueca" },
  { code: "NOK", label: "Corona noruega" },
  { code: "DKK", label: "Corona danesa" },
  { code: "PLN", label: "Złoty polaco" },
  { code: "CZK", label: "Corona checa" },
  { code: "HUF", label: "Forinto húngaro" },
  { code: "RON", label: "Leu rumano" },
  { code: "UAH", label: "Grivna ucraniana" },
] as const;

export type CurrencyCode = (typeof CURRENCY_OPTIONS)[number]["code"];

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && CURRENCY_OPTIONS.some(({ code }) => code === value);
}

/** Shows the ISO code as well as the amount, avoiding ambiguous symbols such as "$". */
export function formatCurrency(amount: number, currency: string = DEFAULT_CURRENCY) {
  const safeCurrency = isCurrencyCode(currency) ? currency : DEFAULT_CURRENCY;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: safeCurrency,
    currencyDisplay: "code",
  }).format(amount);
}
