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

- When generating a database with Supabase for Prisma, need to add `pgbouncer=true&connection_limit=1` to the Transaction DB URL
- Builds will only run on pushes to `dev` (Preview) and `main` (Production)
- Do seeding from local to avoid Vercel timeouts

## Weird exceptions
- Mapbox style has a bug fix in the `text-field` parameter to re-render the Osage name. Because the characters are registered as outside of standard Unicode and outside the range of 65535, it causes the map to error. As a result we use the following expression to allow things to render.
```
[ "case", [ "in", "Osage", [ "to-string", ["get", "Name"] ] ], "Osage", [ "to-string", ["get", "Name"] ] ]
```

### Notes for current development to-dos

Major:
- Testing preview branch functionality

Minor:
- Add login/signup button to menu
- Prep fresh Expo app deploy using the modified endpoints (map list and map page to `polygons` GET and `polygons/[slug]` GET)
- Directly testing all exposed API endpoints
- Publishing blog posts each day

Junior:
- Mobile layout
- Adding Instagram feed (looks a bit complicated annoyingly)
- Link somewhere front page or nav to main /maps directory
- Reviewing API returning 400 vs 500 errors

Bugs:
- Fixing up the raw sql in the polygon PUT (use index.php method)

Before first deploy:
- Doing logging to log drains
- Ensuring database backups reliability

After first deploy:
- Setting up Github action to run npm run build on any PR to dev or main
- Adding a protected Mapbox public token (only for main URL) for prod
- Setting up regular backups for Supabase (beyond 7 day standard, once per month or so dump it somewhere)
- Switch over Prod tilesets to existing tilesets (since those are part of shared Mapbox tilesets?)

Optimization:
- Add last updated date in Mapbox updating research section (for clarity)
- Properly do typescript in auth config files
- Catch logs for API requests that are errors
- Reading over SQL injection in Prisma docs
- Adding a Mapbox updates table, with "Recent update" to help when emptying mapboxgl cache after tile update
- Improving research updates (currently expensive deleteMany and createMany on any update)
- Improving use of Typescript (pretty lazy right now)
- Checking and removing duplicate research entries (requires collaboration with research team)
- Providing more options to react select lists on front page? Is it necessary or 50 initial results is enough?
- Getting language to reload on the current page
- Avoiding prerendering all the language pages (super unnecessary)

Aspirational:
- Adding placenames
- Adding language games and educational tools for learning territories
- Adding a new API endpoint that requires API keys
- Integrating researcher to-do list with the researcher dashboard section
- Adding ability to load other polygons for researchers to draw with more context (perhaps just changing the underlying Style?)
- Adding more refined permissions to enable external researchers to edit only certain polygons or sets of polygons

Questions:
- Do we want contact forms? Or just list emails?
- Getting Patreon back into gear?
- Make color customizable?
