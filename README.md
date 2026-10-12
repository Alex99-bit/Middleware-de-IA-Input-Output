# QuoteFlow

Middleware SaaS para convertir solicitudes comerciales en cotizaciones con IA.

## Rutas

- `/`: landing comercial.
- `/login`: registro e inicio de sesión.
- `/app`: workspace privado con catálogo, cotizador, historial y exportación CSV.
- `/demo`: versión demostración sin autenticación.

## Configuración local

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` desde el SQL Editor.
3. En Supabase, habilita Email en Authentication > Providers.
4. Configura `.env.local`:

```env
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-3.5-flash-lite
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

5. Ejecuta `npm run dev` y abre `http://localhost:3000`.

La clave de Gemini se usa únicamente en el servidor. `.env.local` está excluido del repositorio.

## Validación

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Los planes Starter/Pro están modelados visualmente, pero el cobro recurrente queda pendiente de conectar a Stripe o Mercado Pago. La entrada inicial soporta texto; la transcripción de audio se puede añadir sobre el mismo flujo de generación.
