# Pokedex

Angular application (CLI 21) set up for deployment on GitHub Pages.

Requires Node 22+ and Corepack (`corepack enable`).

## Local development

```bash
pnpm install
pnpm start
```

Open `http://localhost:4200/`. The app reloads when you save changes.

## Production build (GitHub Pages)

```bash
pnpm run build:gh-pages
```

Output goes to `dist/pokedex/browser` with `baseHref` `/pokedex/` for `https://<username>.github.io/pokedex/`.

To test the production build locally:

```bash
pnpm install --frozen-lockfile
pnpm run build:gh-pages
pnpm dlx http-server dist/pokedex/browser -p 4200
```

Then open `http://localhost:4200/pokedex/`.

## Other commands

```bash
ng test          # unit tests (Vitest)
ng build         # build (production configuration by default)
```

## Resources

- [Angular CLI](https://angular.dev/tools/cli)
- [GitHub Pages](https://docs.github.com/en/pages)
