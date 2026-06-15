# Bots Channel

Static Vite version of the original Bots Channel landing page and platform.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
```

## Cloudflare Pages

- Root directory: `apps/botschannel`
- Build command: `pnpm build`
- Output directory: `dist`

`public/_redirects` is included so SPA routes such as `/landing` and `/platform` resolve correctly on Cloudflare Pages.
