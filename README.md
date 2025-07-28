# Mycelium

This monorepo represents the full stack of our blog application, _Mycelium: the app with no users_

Mycelium permits all visitors to the site to contribute, that we work together to open our collective third eye and enjoy the wisdom flowing through us as vessels of the universe becoming conscious of itself.

From the landing page, users can

- view all the blog posts by Tagline
- click a 'create' button to contribute a new blog post
- click on a blog post to view its author and content data, and access its 'edit' button
- the edit button will permit users to further develop the blog post, by updating/editing its tagline, author and content fields

## What's inside?

This [Turborepo](https://turborepo.com/docs) includes the following packages/apps:

### apps/api

- Backend API, built with [NestJS](https://docs.nestjs.com/) and [TypeORM](https://typeorm.io/docs/getting-started)

### apps/web

- Frontend [React](https://react.dev/reference/react) Website, using [Vite](https://vite.dev/guide/) as its build tool

### infra/postgres

- A [PostgreSQL](https://www.postgresql.org/docs/) dev/test database, served from within a [Docker](https://docs.docker.com/) container mapped to `http://localhost:5433`

### utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Quick Start

### Prerequisites

For development and test environments, this repo assumes you have a Docker daemon running.

### Build

> We recommend installing [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation). If you choose not to, prefix each `turbo` command with `npx`.

To build all apps and packages, `cd` to the repository's root directory and run the following command:

> `turbo build`

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

> `turbo build --filter=api`

### Develop

To develop all apps and packages, run the following command:

`turbo dev`

Use the same filter format to target specific applications.

`turbo dev --filter=api --filter=postgres-dev`

### Test

To test all apps and packages, run the following command:

`turbo test`

Use the same filter format to target specific applications.

`turbo test --filter=api --filter=postgres-dev`

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

`turbo login`

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

`turbo link`

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
