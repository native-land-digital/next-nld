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

You can find more about how to use the Native Land API at our documentation at https://api-docs.native-land.ca/.

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
- i18n, next-intl (Note: had to remove due to middleware costs)
- Datadog ingesting logs from Vercel

We would love to have you involved if you have any fixes or additions you'd like to see on the site.

### Dev Environment

To get set up:

- Clone this repo to your local machine.
- Copy the `.sample-env` file to `.env` and replace any values that need it

(If you are a staff member of Native Land or working directly with the developers of Native Land Digital, ask for `env` values to get set up with our inner access to AWS, Mapbox, and TinyMCE. Otherwise, to get a fully working repo, there are a few hoops you need to jump through. See the second below ("Independent Local Setup") for instructions.)

- `npm install` and ensure you are set up as for any NextJS project
- Run docker compose file or set up PostgreSQL database with PostGIS enabled

(The repo has a `compose.yml` file that will create and install a PostgreSQL database with PostGIS installed on your Docker. The references to this are already in the `.env` file. However, if you'd prefer to set this up with your own `psql` instance, just replace the `DATABASE_URL` in the `.env` to get things working. Otherwise, start docker and run `docker compose build` and `docker compose up` to get connected.)

- `npx prisma migrate deploy` to apply migrations
- `npx prisma db seed`

- `npm run dev` will fire up the dev project, and you can visit `http://localhost:3000` to view the site.
- To login, use `test@native-land.ca` and password `test`.

### Independent Local Setup

You will need to populate the `.env` with your own values.

- AWS variables. Because this app stores data in S3, you'll need to set up a bucket for uploads (`AWS_NEXT_BUCKET_NAME`) and geoJSONs (`AWS_GEOJSON_BUCKET`). Then, create an IAM user with appropriate permissions for those buckets and enter the required values (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`).
- To get the text editor working in the `/dashboard/research`, sign up for a TinyMCE key. It will automatically be enabled to work for `localhost`, and no CC is required.
- Create a Mapbox account and get a public token (`NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN`), and you can use the same style for both `NEXT_PUBLIC_MAPBOX_STYLE` and `NEXT_PUBLIC_MAPBOX_STYLE_RESEARCH`. You'll also need a secret token to generate tilesets into your account (`MAPBOX_SECRET_TOKEN` and `MAPBOX_USERNAME`)
- Add a Resend API key to test user signup (`RESEND_API_KEY`)

Please let us know if you have trouble doing this setup.

### Tech Notes

All polygons are stored in the PostGIS database as MultiPolygons. They can be flattened when retrieved, but this is to keep a single geography type while still allowing researchers to draw more complex shapes when necessary.

The Mapbox layers are named `territories`, `territories_text`, `languages`, `languages_text`, `treaties`, `treaties_text`. If you want to mimic the front page behaviour of the Native Land map, you'll need to name them the same way after you generate tilesets that upload to Mapbox (via the `dashboard/mapbox` buttons).

We have built a rather complicated redirection and rewrite system to handle internationalization without middleware and without needing to generate thousands of extra pages. It works like this:

- Any page visited without an internationalized prefix (`/`) is served (via a rewrite) the `/en` version of that page
- Any page visited with an internationalized URL (ie, `/fr/about/`) that is not the root redirects to a non-internationalized URL (`/about`)
- Only the root page serves properly internationalized content (since we don't have translations across the site anyway)

All this is set as redirects and rewrites inside `next.config.mjs`. As a result, anytime a new language is added or a new directory from the root is added, you must add the language code in `src/i18n/config.js`.

## Deployment notes

Deployment will run from the `dev` branch to a Preview in Vercel. In the Preview, comments and notes can be made. From there, changes will be reviewed and the resulting PR assigned to `main`.

Notes:

- When generating a database with Supabase for Prisma, need to add `pgbouncer=true&connection_limit=1` to the Transaction DB URL
- Builds will only run on pushes to `dev` (Preview) and `main` (Production)
- Do seeding from local to avoid Vercel timeouts

Current costs:

- Cloudflare DNS and caching, $28 monthly
- Premium Supabase ($35 monthly)
- Maximum budget of $100 in Vercel ($20 base + $10 for logs)
- Logging with Datadog, free tier

## Weird exceptions

- Mapbox style has a bug fix in the `text-field` parameter to re-render the Osage name. Because the characters are registered as outside of standard Unicode and outside the range of 65535, it causes the map to error. As a result we use the following expression to allow things to render.
```
[ "case", [ "in", "Osage", [ "to-string", ["get", "Name"] ] ], "Osage", [ "to-string", ["get", "Name"] ] ]
```

## Notes for current development to-dos

- Fixing up header wrapping in session provider?
- Adding link to researcher to see the front-end page
- Moving API to a Lambda
- Moving front-page geocoding to a Lambda

- Figuring out logging in Cloudwatch to reduce and trim any costs

After things are confirmed and comfy:
- Switch over Prod tilesets to existing tilesets (since those are part of shared Mapbox tilesets?)
- re adding Google Analytics?
- Moving to free plan with Cloudflare (we aren't using most services; keep DNS and basic CDN routing)
- Removing all the extra CPanel-related DNS records
- Playing with Datadog
- How to handle long term log storage?

Optimizing:
- Ensuring Cloudfront CDN is written for uploaded images
- Improving mobile app fetch for resources (endpoint provides ALL data which is too much)

Aspirational:
- Adding placenames
- Adding language games and educational tools for learning territories
- Sorting out how to share seed file effectively without sharing IAM

Questions:
- Should the site open stuff in a new window? Or open in the same window?
- Overall general app review for improvements
- At last tackling Africa?
- Getting Patreon back into gear?
- Doing more blog posts again?
- Updating content?
- Adding a new roadmap?
- Redoing top links? Showing off maps more, special pages more
