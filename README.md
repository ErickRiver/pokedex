# Pokedex

Aplicación Angular (CLI 21) preparada para desplegarse en GitHub Pages.

## Desarrollo local

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. La app se recarga al guardar cambios.

## Build de producción (GitHub Pages)

```bash
npm run build:gh-pages
```

Genera los artefactos en `dist/pokedex/browser` con `baseHref` `/pokedex/` para el sitio `https://<usuario>.github.io/pokedex/`.

Para probar el build localmente:

```bash
npm ci
npm run build:gh-pages
npx http-server dist/pokedex/browser -p 4200
```

Luego visita `http://localhost:4200/pokedex/`.

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub llamado `pokedex` y sube este código a la rama `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Tras el primer push a `main`, el workflow [deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml) construye y publica el sitio.
4. La URL será `https://<tu-usuario>.github.io/pokedex/`.

## Otros comandos

```bash
ng test          # tests unitarios (Vitest)
ng build         # build (usa configuración production por defecto)
```

## Recursos

- [Angular CLI](https://angular.dev/tools/cli)
- [GitHub Pages](https://docs.github.com/en/pages)
