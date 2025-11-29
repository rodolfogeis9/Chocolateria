# Chocolatería Temuco

Sitio estático hecho con React + Vite para una chocolatería artesanal. Incluye catálogo de chocolates y alfajores, carrito básico y envío de pedido por WhatsApp.

## Requisitos
- Node.js 18+
- npm

## Instalación
```bash
npm install
npm run dev
```

## Estructura
- `src/config/products.ts`: productos, precios e imágenes (reemplaza las fotos en `public/images`).
- `src/config/settings.ts`: número de WhatsApp y textos principales (hero, contacto, quiénes somos).
- `src/components/`: componentes reutilizables (header, hero, tarjetas, carrito, etc.).
- `src/pages/Home.tsx`: página principal con todas las secciones.

## WhatsApp
- Botón de consulta general en el header usa `GENERAL_QUERY_MESSAGE` y `WHATSAPP_NUMBER` de `settings.ts`.
- El botón "Enviar pedido por WhatsApp" en el carrito arma el mensaje con el contenido del carro y abre `https://wa.me/`.
