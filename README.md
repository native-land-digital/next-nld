# Native Land 2.0

Welcome to Native Land 2.0! This is a NextJS and PostGIS rebuild of Native-Land.ca.

## History

Native Land was created as a hobby project by Victor Temprano (http://victortemprano.com) in 2015, as a way to help learn more Indigenous territories and the history of colonialism. Since then, it has grown substantially, becoming a non-profit (Native Land Digital) a few years later as the site grew in popularity. Now, it has a small team and a board of directors, which you can read about more on the website itself, and we are always trying to add more and bring knowledge of Indigenous ways of being with the land to more people.

On the tech side, the site has gone through a number of iterations:

- Google Maps stored in JSON files
- Leaflet JS with a Wordpress blog
- A Wordpress backend while still serving from static JSONs
- Partnership with Mapbox and use of Mapbox tilesets
- Custom Wordpress plugin developed by Mapster Technology Inc. (https://mapster.me)
- Fully integrated Wordpress site hosting GIS files, pushing to Mapbox

With this latest build, we are moving away from Wordpress into a leaner, more directly developed tech stack customized for Native Land's needs.

## Native Land API

The Native Land API is in the process (as of September 2024) of moving over to an API key model instead of being completely open. This is to help manage excessive requests and to keep better track of how people are using the data that we curate from Indigenous communities.

You can find more about how to use the Native Land API at our documentation here. (DO GITBOOK OR OTHER API DOC LINK)

## This Repo

Technologies at use include:

- NextJS (app components)
- Prisma
- Typescript
- TailwindCSS
- PostgreSQL with PostGIS
- Next Auth
- Amazon S3 buckets
- Mapbox MTS and Mapbox GL JS
- i18n and json5
- Datadog ingesting logs from Vercel

We would love to have you involved if you have any fixes or additions you'd like to see on the site.

### Dev Environment

To get set up, clone this repo to your local machine. `npm install` and ensure you are set up as for any NextJS project. `npm run dev` will fire up the dev project, and you can visit `http://localhost:3000` to view the site.

The repo has a `compose.yml` file that will create and install a PostgreSQL database with PostGIS installed on your Docker. The references to this are already in the `.env` file. However, if you'd prefer to set this up with your own `psql` instance, just replace the `DATABASE_URL` in the `.env` to get things working. Otherwise, start docker and run `docker compose build` and `docker compose up` to get connected.

You will need to run the Prisma migrations and the seed files in order to get a fully working local site. You will need to ask a member of the Native Land team for the `nld-export.json` seed file. Once you have this, place it in `prisma/seed/nld-export.json`. Then run `npx prisma migrate` and `npx prisma db seed`. The seed file is in the `prisma/seed` folder if you need to make any changes to it.

It will also create a default user with full admin permissions. Login with `test@native-land.ca` and password `test`.

You may have trouble displaying the Mapbox map with our styles and tilesets without an API token -- please get in touch with our dev team on Discord (https://discord.gg/8a6sJfDgD7) if you have any trouble with this.

All polygons are stored in the PostGIS database as MultiPolygons. They can be flattened when retrieved, but this is to keep a single geography type while still allowing researchers to draw more complex shapes when necessary.

Logs are generated when hitting the public API (`/api/index.php`) and stored in the `logs/` folder.

## Deployment notes

Deployment will run from the `dev` branch to a Preview in Vercel. In the Preview, comments and notes can be made.

From there, changes will be reviewed and the resulting PR assigned to main.

Notes:

- When generating a database with Supabase for Prisma, need to add `pgbouncer=true&connection_limit=1` to the Transaction DB URL
- Builds will only run on pushes to `dev` (Preview) and `main` (Production)
- Do seeding from local to avoid Vercel timeouts

Current costs:

- Premium Supabase ($35 monthly)
- Maximum budget of $100 in Vercel
- Logging

## Weird exceptions
- Mapbox style has a bug fix in the `text-field` parameter to re-render the Osage name. Because the characters are registered as outside of standard Unicode and outside the range of 65535, it causes the map to error. As a result we use the following expression to allow things to render.
```
[ "case", [ "in", "Osage", [ "to-string", ["get", "Name"] ] ], "Osage", [ "to-string", ["get", "Name"] ] ]
```

### Notes for current development to-dos

Major:
- Double password on signup
- Close button to results in mobile
- Re-import with latest data to production
- Add FB feed

Minor:
- Adding Instagram feed (looks a bit complicated annoyingly)
- Doc update for agreeing to data treaty
- Prep fresh Expo app deploy using the modified endpoints (map list and map page to `polygons` GET and `polygons/[slug]` GET)

For first deploy:
- Namecheap, change over DNS servers to Vercel
- Add C name for docs, update links inside application
-

After first deploy:
- Seeing if Google Analytics is logging correctly
- Adding a protected Mapbox public token (only for main URL) for prod
- Setting up regular backups for Supabase (beyond 7 day standard, once per month or so dump it somewhere)
- Switch over Prod tilesets to existing tilesets (since those are part of shared Mapbox tilesets?)
- Keeping an eye on Datadog logs to see how many GBs we are sending (we will upgrade to Pro eventually); creating some Dashboards

Aspirational:
- Adding placenames
- Adding language games and educational tools for learning territories

Questions:
- Mines and developments
- At last tackling Africa?
- Getting Patreon back into gear?
- Doing more blog posts again?
- Updating content?
- Adding a new roadmap?
- Redoing top links? Showing off maps more, special pages more
