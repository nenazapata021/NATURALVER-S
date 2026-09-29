# NATURALVER'S — Ecommerce

Tienda en línea de productos naturales de medicina ancestral. Por un mundo mejor.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **CMS:** Payload CMS 3
- **Base de datos:** PostgreSQL (Supabase)
- **Estilos:** Tailwind CSS 4
- **Iconos:** Lucide React

## Requisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) (gratis)

## Configuración

1. Clona el repositorio
2. Instala dependencias:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Crea un proyecto en Supabase
4. Copia `.env.example` a `.env` y configura:
   ```env
   PAYLOAD_SECRET=tu_clave_secreta_aqui
   DATABASE_URI=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_NUMBER=573106198912
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/naturalvers21
   ```
5. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Accesos

| Ruta | Descripción |
|------|-------------|
| `http://localhost:3000` | Tienda pública |
| `http://localhost:3000/admin` | Panel de administración |
| `http://localhost:3000/api/seed` | Seed de datos de ejemplo (POST) |

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linter |

## Estructura

```
src/
├── app/              # Rutas (App Router)
│   ├── page.tsx      # Home
│   ├── productos/    # Catálogo + detalle
│   ├── carrito/      # Carrito de compras
│   ├── checkout/     # Finalizar pedido
│   ├── confirmacion/ # Confirmación + WhatsApp
│   └── api/          # API routes (orders, seed)
├── collections/      # Colecciones de Payload
│   ├── Products.ts
│   ├── Categories.ts
│   ├── Orders.ts
│   ├── Customers.ts
│   ├── Users.ts
│   └── Media.ts
├── components/       # Componentes React
├── types/            # Tipos TypeScript
└── styles/           # CSS global
```

## Funcionalidades

- Catálogo con filtro por categoría
- Detalle de producto con ingredientes, modo de uso y advertencias
- Carrito de compras con persistencia en sesión
- Checkout que crea pedido en Payload
- Enlace de WhatsApp con mensaje pre-completado
- Panel admin para gestionar productos, inventario y pedidos
- Diseño responsive (mobile-first)
- Textos en español, precios en COP
- Envíos dentro de Colombia

## Nota sobre pagos

Los productos contienen cannabis, por lo que algunas pasarelas de pago restringen este tipo de artículos. El flujo actual es 100% por WhatsApp. Para añadir pagos en línea, revisa qué permite cada pasarela (Wompi, Mercado Pago, etc.) y los requisitos del INVIMA para Colombia.
