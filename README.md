# damero

Generador de códigos QR que corre 100% en el navegador. Sin backend, sin
llamadas de red, sin telemetría: el texto que codificas y el logo que subes
nunca salen de tu máquina.

## Características

- Vista previa en vivo mientras escribes.
- Descarga como **PNG** o **SVG**.
- Logo opcional centrado (PNG, JPG, WebP o SVG).
- Colores de primer plano y de fondo configurables.
- Nivel de corrección de errores L / M / Q / H.
- Versión QR automática o forzada (1–40).
- Historial de los últimos QRs generados, guardado en el propio navegador.
- Aviso cuando el logo puede degradar la lectura (corrección < H).

## Stack

- Vite + React + TypeScript
- [`qr-code-styling`](https://github.com/kozakdenys/qr-code-styling) para
  generar el QR
- Composición de logo sobre Canvas y sobre SVG hecha a mano
- Vitest para la lógica pura

## Desarrollo

Requisitos: Node 20+ y pnpm.

```bash
pnpm install
pnpm dev        # servidor de desarrollo
pnpm test       # tests de lógica pura
pnpm build      # build de producción a dist/
pnpm preview    # sirve el build de producción localmente
```

## Estructura

```text
src/
  core/          # lógica pura: validación, render, composición, historial
  pages/         # páginas de la app
  components/    # componentes React
  hooks/         # hooks reutilizables
  styles/        # CSS
  main.tsx       # entry point, monta la página raíz
```
