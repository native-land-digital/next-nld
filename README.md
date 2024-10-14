# Native Land 2.0

Welcome to Native Land 2.0! This is a NextJS and PostGIS rebuild of Native-Land.ca. If you want to help out with the site on a technical or design level, you're very welcome here!

## This Repo

Technologies at use include:

- NextJS (app directory)
- Prisma
- Typescript
- TailwindCSS
- PostgreSQL with PostGIS
- Next Auth
- AWS S3 buckets for assets fronted with Cloudfront
- AWS Lambdas for API and geocode searcher, via API Gateway
- Mapbox MTS and Mapbox GL JS
- i18n custom solution with rewrites and redirects to avoid middleware costs
- Logs with CloudWatch for API gateways
- Google Analytics for general website analytics

We would love to have you involved if you have any fixes or additions you'd like to see on the site.

## Dev Environment

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

## Independent Local Setup

You will need to populate the `.env` with your own values.

- AWS variables. Because this app stores data in S3, you'll need to set up a bucket for uploads (`AWS_NEXT_BUCKET_NAME`) and geoJSONs (`AWS_GEOJSON_BUCKET`). Then, create an IAM user with appropriate permissions for those buckets and enter the required values (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`).
- You also need to create Lambdas to fully re-create the NLD API (`/api/index.php` or `/api/polygon/searcher`). If you're just working locally, this doesn't apply. Create test lambdas named `nld_api_dev` and `nld_search_dev`, and prod lambdas named `nld_api` and `nld_search`. Hook them up to API Gateway and enter the appropriate URLs in your `.env` (`AWS_API_ENDPOINT` and `AWS_GEOCODE_ENDPOINT`). If you're forking this, you'll need to add Github secrets as well for the YML files.
- To get the text editor working in the `/dashboard/research`, sign up for a TinyMCE key. It will automatically be enabled to work for `localhost`, and no CC is required.
- Create a Mapbox account and get a public token (`NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN`), and you can use the same style for both `NEXT_PUBLIC_MAPBOX_STYLE` and `NEXT_PUBLIC_MAPBOX_STYLE_RESEARCH`. You'll also need a secret token to generate tilesets into your account (`MAPBOX_SECRET_TOKEN` and `MAPBOX_USERNAME`)
- Add a Resend API key to test user signup (`RESEND_API_KEY`)

Please let us know if you have trouble doing this setup. It's not easy!

## Tech Notes

All polygons are stored in the PostGIS database as MultiPolygons. They can be flattened when retrieved, but this is to keep a single geography type while still allowing researchers to draw more complex shapes when necessary.

The Mapbox layers are named `territories`, `territories_text`, `languages`, `languages_text`, `treaties`, `treaties_text`. If you want to mimic the front page behaviour of the Native Land map, you'll need to name them the same way after you generate tilesets that upload to Mapbox (via the `dashboard/mapbox` buttons).

We have built a rather complicated redirection and rewrite system to handle internationalization without middleware and without needing to generate thousands of extra pages. It works like this:

- Any page visited without an internationalized prefix (`/`) is served (via a rewrite) the `/en` version of that page
- Any page visited with an internationalized URL (ie, `/fr/about/`) that is not the root redirects to a non-internationalized URL (`/about`)
- Only the root page serves properly internationalized content (since we don't have translations across the site anyway)

All this is set as redirects and rewrites inside `next.config.mjs`. As a result, anytime a new language is added or a new directory from the root is added, you must add the language code in `src/i18n/config.js`.

To test lambdas locally, run `npm run lambda` with your database connected to run the test suite.

## Deployment notes

Deployment will run from the `dev` branch to a Preview in Vercel. In the Preview, comments and notes can be made. From there, changes will be reviewed and the resulting PR assigned to `main`.

Notes:

- When generating a database with Supabase for Prisma, need to add `pgbouncer=true&connection_limit=1` to the Transaction DB URL
- Builds will only run on pushes to `dev` (Preview) and `main` (Production)
- Do seeding from local to avoid Vercel timeouts
- Github actions will push lambdas to `dev` Lambdas on pushes to `dev`, and prod Lambdas on pushes to `main`

Current costs:

- Cloudflare DNS and caching, $28 monthly
- Premium Supabase ($35 monthly)
- Maximum budget of $100 in Vercel ($20 base)
- Lambdas, S3, Cloudfront with AWS

## Weird exceptions

- Mapbox style has a bug fix in the `text-field` parameter to re-render the Osage name. Because the characters are registered as outside of standard Unicode and outside the range of 65535, it causes the map to error. As a result we use the following expression to allow things to render.
```
[ "case", [ "in", "Osage", [ "to-string", ["get", "Name"] ] ], "Osage", [ "to-string", ["get", "Name"] ] ]
```

## Logs and Analytics

- Logs in Cloudflare give some basic information on API usage sorted into graphs
- CloudWatch Analytics Dashboards give us a good sense of the major referers, data usage, and so on
- Google Analytics for deep diving and longer data retention than Cloudflare

## Notes for current development to-dos

- Changing so there is a basic seed file in the repo, and otherwise we'll do dumps for new devs
- Twilio NFP signup

Aspirational:
- Adding placenames
- Adding language games and educational tools for learning territories

Questions:
- Should the site open stuff in a new window? Or open in the same window?
- Overall general app review for improvements
- At last tackling Africa?
- Getting Patreon back into gear?
- Doing more blog posts again?
- Updating content?
- Adding a new roadmap?
- Redoing top links? Showing off maps more, special pages more

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
