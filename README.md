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

- NextJS (app directory)
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

You will need to run the Prisma migrations and the seed files in order to get a fully working local site. Run `npx prisma migrate deploy` and `npx prisma db seed`. The seed files are in AWS, with one for production and one that is substantial enough for most testing.

It will also create a default user with full admin permissions. Login with `test@native-land.ca` and password `test`.

You may have trouble displaying the Mapbox map with our styles and tilesets without an API token -- please get in touch with our dev team on Discord (https://discord.gg/8a6sJfDgD7) if you have any trouble with this.

All polygons are stored in the PostGIS database as MultiPolygons. They can be flattened when retrieved, but this is to keep a single geography type while still allowing researchers to draw more complex shapes when necessary.

To get the text editor working in the `/dashboard/research`, sign up for a TinyMCE key. It will automatically be enabled to work for `localhost`, and no CC is required.

## Deployment notes

Deployment will run from the `dev` branch to a Preview in Vercel. In the Preview, comments and notes can be made.

From there, changes will be reviewed and the resulting PR assigned to main.

Notes:

- When generating a database with Supabase for Prisma, need to add `pgbouncer=true&connection_limit=1` to the Transaction DB URL
- Builds will only run on pushes to `dev` (Preview) and `main` (Production)
- Do seeding from local to avoid Vercel timeouts

Current costs:

- Cloudflare DNS and caching, $28 monthly
- Premium Supabase ($35 monthly)
- Maximum budget of $100 in Vercel
- Logging with Datadog, free tier

## Weird exceptions
- Mapbox style has a bug fix in the `text-field` parameter to re-render the Osage name. Because the characters are registered as outside of standard Unicode and outside the range of 65535, it causes the map to error. As a result we use the following expression to allow things to render.
```
[ "case", [ "in", "Osage", [ "to-string", ["get", "Name"] ] ], "Osage", [ "to-string", ["get", "Name"] ] ]
```

### Notes for current development to-dos

Major:
- Adding password reset
- Protecting backend with checking for IDs before checking for permissions 
- Prep fresh Expo app work using the modified endpoints (map list and map page to `polygons` GET and `polygons/[slug]` GET)

Minor:
- Minor layout fixes in research section with tables and stuff (on clear)
- Adding Instagram feed (looks a bit complicated annoyingly)

For first deploy:
- Cloudflare, point to Vercel

After first deploy:
- Regenerate tilesets to match native-land.ca URL (and geojsons)
- Ensure any this-week edits are in the new platform
- Deleting the test user once Tanya and Victor are created
- Seeing if Google Analytics is logging correctly
- Adding a protected Mapbox public token (only for main URL) for prod
- Setting up regular backups for Supabase (beyond 7 day standard, once per month or so dump it somewhere)
- Switch over Prod tilesets to existing tilesets (since those are part of shared Mapbox tilesets?)
- Keeping an eye on Datadog logs to see how many GBs we are sending (we will upgrade to Pro eventually); creating some Dashboards
- Watching over first day or two to see major sources of data usage, what's getting hit, are we going to hit any limits?
- Deploying app changes
- Potentially doing https://vercel.com/docs/integrations/external-platforms/cloudflare proxy in front of Vercel if bandwidth too high
- Moving to free plan with Cloudflare, or getting rid of Cloudflare (just an extra account really) and using Namecheap directly
- Removing all the extra CPanel-related DNS records

Aspirational:
- Adding placenames
- Adding language games and educational tools for learning territories

Questions:
- At last tackling Africa?
- Getting Patreon back into gear?
- Doing more blog posts again?
- Updating content?
- Adding a new roadmap?
- Redoing top links? Showing off maps more, special pages more
