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

### The Development Environment

To ensure the docker container and API connect to the intended database create the following .env files in the root of your local repository:

#### /.env.test

```code
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASS=postgres
DB_NAME=mycelium_test
```

#### /.env.development

```code
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASS=postgres
DB_NAME=mycelium_test
```

Create the following environment variables to ensure that the Vite api proxy specified in `/apps/web/vite.config.ts` targets the development NestJS API

#### /apps/web/.env.development

```code
VITE_API_HOST=localhost
VITE_API_PORT=3000
```

#### Handy Scripts

_from /apps/api_:

- `npm run seed-dev` enables you to re-seed the dev database

_from repo root_:

- `npm run stop-pg-dev` will compose down the postgres container and clear its volumes

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

### Build

> We recommend installing [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation). If you choose not to, prefix each `turbo` command with `npx`.

To build all apps and packages, `cd` to the repository's root directory and run the following command:

> `turbo build`

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

> `turbo build --filter=api`

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
