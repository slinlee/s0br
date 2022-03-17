# S0BR

An experiment to make something I want to use myself using Web3 tech.

The UI was created with [SvelteKit](https://kit.svelte.dev/) and [TailwindCSS](https://tailwindcss.com/)

## Developing

Copy `.env.example` to `.env` and fill in at least the [Moralis](https://moralis.io) API key.

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Run tests with `npm run test`

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

Deployments happen automatically to s0br.vercel.app when merging to `main`
