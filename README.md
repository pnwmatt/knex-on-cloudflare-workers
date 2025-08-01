# knex-on-cloudflare-workers

This is a fork of the awesome [Knex.js](https://knexjs.org/) library, adapted to be able to be "rolledup" and work on Cloudflare Workers.

## My setup

- Nuxt v4
- Nuxt UI
- TypeScript
- [Sutando ORM](https://sutando.org) as an Active Record ORM.  With `shared/` in Nuxt4, I can use the same Models code on the frontend Nuxt side and the backend Knex-connected database.
- [Cloudflare D1](https://developers.cloudflare.com/d1/) as the database
  - Knex doesn't work out-of-the-box for D1, but the same author of Sutando created a [D1 Dialect for Knex](https://github.com/kiddyuchina/knex-cloudflare-d1)

Sutando has a working example of the ORM on a [Cloudflare Worker + Hono Router with a D1 Database](https://github.com/sutandojs/sutando-examples/blob/main/typescript/rest-hono-cf-d1/src/index.ts) - so I knew Sutando *could* work with D1, but when I wired it into my Nuxt4 app, I was able to get my `wrangler dev` working - but deploys failed due to bugs that seemingly didn't happen in rest-hono-cf-d1. 

As of August 2025, this package when combined with the above, creates a working Nuxt 4 + Sutando + D1 stack.  I plan to continue to make modifications to this package if other errors arise and apply security updates if available.  Pull requests are welcome.

## Modifications made for `knex-on-cloudflare-workers`
This package, `knex-on-cloudflare-workers`, is my attempt to fix the issues I experienced to enable a Nuxt/Sutando/D1 stack.

1) Knex, the project, uses the `debug` package in a few files.  I believe there's some code in the setup of a cloud-based Cloudflare Worker that overwrites what `debug` name that overrides Knex's package.json inclusing of `debug`.
    - I removed the `debug` package from this package.json and replaced calls to it (`require('debug');`) with `() => { }` to no-op the calls to debug.
      - [ ] I am going to search more/write on their forums and confirm this hypothesis with them.  There was some references to this being an issue, but not specifically for `debug`.
2) Rollup had a tough time understanding what a `optional` dependency is in package.json.  Even though `lib/dialect/mysql/` is dynamically loaded only when a Knex client uses `mysql`, Rollup was wanting me to add the `mysql` drivers to package.json.
    - I experimented a lot with `external` and other flags in the `rollup.config.js` (which in my stack was in nuxt.config.ts with both vite and nitro), but after much head bashing, I opted to just remove the `lib/dialect/*` from the code base.  There are changes to constant defs, page requirements, and some other areas of the code that had a reference to other drivers.
      - [ ] I am going to search more/write on their forums and confirm this problem.
3) Lastly, I was getting a weird mix-up of `.js` and `.ts` in my main project when I updated my package.json to use this package as an alias for `knex` to override Sutando's dependency on the real Knex.
    - I opted to remove the .ts files from lib/dialect and let the classic JS do its thing.

## Other fixes

- Fixed a regression in [knex-cloudflare-d1](https://github.com/kiddyuchina/knex-cloudflare-d1/pull/5)

## Usage

### package.json

Add these to your dependencies:
```
{
  "dependencies": {
    "knex": "https://github.com/pnwmatt/knex-on-cloudflare-workers.git#v1.0.0",
    "knex-cloudflare-d1": "^0.2.1",
    "sutando": "^1.7.2",
  }
}
```

Add this `resolutions` to your package.json as well:
```
{
  "resolutions": {
    "knex": "https://github.com/pnwmatt/knex-on-cloudflare-workers.git#v1.0.0"
  }
}
```

