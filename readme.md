# Blueprint

-   Blueprint is a Next.js starter kit built to help you get your project off the ground faster so you can focus less on the tedious setup and more on building incredible experiences for your users.
-   Blueprint aims to provide a minimal set of feautures and examples that you can use to expand into your own projects and customize to fit your needs.

-   This project is inspired by shadcn's Taxonomy project (https://tx.shadcn.com/).
-   Check out shadcn on twitter https://twitter.com/shadcn

## Getting Started

1. Install dependencies by running `pnpm install`.
    - If you do not have pnpm installed, follow the directions here: https://pnpm.io/installation.
2. Setup the database
    - `cd packages/db` - Go to the database package.
    - `cp .env.example .env` - Copy the environment.
        - Follow the instructions in the `.env` file to setup a database with PlanetScale or Docker.
3. Setup the website
    - `cd apps/web` - Go to the Next.js website app.
    - `cp .env.example .env` - Copy the environment.
        - Follow the instructions in the `.env` file to setup all of the required environment variables.
4. To run the website, run `pnpm dev` and visit `http://localhost:3000/`

## Technology Stack

-   These are the technologies that are used and recommended for this starter kit. But I understand that not everyone uses everything in this list. The code is yours for you to customize. For example, switching out Next Auth for Clerk.

1. Next.js 13 + React 18
    - https://nextjs.org/docs
    - https://nextjs.org/learn
    - https://react.dev/
2. Shadcn UI Components
    - https://ui.shadcn.com/
3. tRPC
    - https://trpc.io/docs
4. Next Auth (Auth.js)
    - https://next-auth.js.org/
5. Prisma
    - https://www.prisma.io/docs
6. PlanetScale (recommended)
    - https://planetscale.com/
    - https://planetscale.com/docs/prisma/prisma-quickstart
7. Stripe
    - https://stripe.com/docs
