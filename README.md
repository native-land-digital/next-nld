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
- Winston logging
- i18n and json5

We would love to have you involved if you have any fixes or additions you'd like to see on the site.

### Dev Environment

To get set up, clone this repo to your local machine. `npm install` and ensure you are set up as for any NextJS project. `npm run dev` will fire up the dev project, and you can visit `http://localhost:3000` to view the site.

The repo has a `compose.yml` file that will create and install a PostgreSQL database with PostGIS installed on your Docker. The references to this are already in the `.env` file. However, if you'd prefer to set this up with your own `psql` instance, just replace the `DATABASE_URL` in the `.env` to get things working. Otherwise, start docker and run `docker compose build` and `docker compose up` to get connected.

You will need to run the Prisma migrations and the seed files in order to get a fully working local site. Do this with `npx prisma migrate` and `npx prisma db seed`. The seed file is in the `prisma/seed` folder if you need to make any changes to it.

It will also create a default user with full admin permissions. Login with `test@native-land.ca` and password `test`.

You may have trouble displaying the Mapbox map with our styles and tilesets without an API token -- please get in touch with our dev team on Discord (https://discord.gg/8a6sJfDgD7) if you have any trouble with this.

All polygons are stored in the PostGIS database as MultiPolygons. They can be flattened when retrieved, but this is to keep a single geography type while still allowing researchers to draw more complex shapes when necessary.

Logs are generated when hitting the public API (`/api/index.php`) and stored in the `logs/` folder.

### Notes for current development to-dos

Next up:
- Endpoints for mobile app (map-list (category, id, title, slug); map-page(all provided to frontend), )
- Handling bugs
- Sending emails (contact forms)
- Creating contact forms
- Developing front page HTML
- Set up so that only English content is generated server side (no translations for everything else)
- Fail gracefully to loading english content if other intl content doesn't exist

Minor:
- Adding captions and titles to researcher media
- Adding working links to breadcrumbs
- Checking and rendering related field front end
- Add color to index.php API (needs importing?)
- Check for any redirection needs on legacy API
- Endpoint for combined geoJSON for whole categories
- Add last updated date in Mapbox updating research section (for clarity)
- Set up a redirect from `https://native-land.ca/wp-json/nativeland/v1/api/index.php` to `/api/index.php` for POST requests (poly-in-poly)
- Consolidating API code with helper functions (instead of duplicating)
- Keep seed file in public repo? Or only on request from a user?

Junior:
- Adding links to social media to footer
- Adding modal to front page map
- Mobile layout
- Move over all English translations (template is at `en/about/how-it-works.json5`)
- Setting up static pages HTML (template is at `about/how-it-works`)
- Migrate blog posts from Wordpress to an external blog site
- Reviewing API returning 400 vs 500 errors
- Adding Instagram feed (looks a bit complicated annoyingly)
- Create API documentation at external documentation site

Bugs:
- Working to get either database in the right encoding, downloading seed file in better encoding, or render properly in frontend with special characters
- Possible sql injection until we figure out the sql raw query in index.php POST and polygons/id PUT
- Ensuring poly-in-poly (index.php POST) can take multiple polygons
- Some territory slugs do not work as URLs -- possible to use IDs and do redirects from old slugs instead?
- Looking around for any small errors with JSX in server or frontend code, resolving
- Issues with maximum glyphs in Mapbox GL JS front page map (style issue?)
- Small cleanups (removing email verification / password reset notes in Log In, adding link to Login from Signup)

Before first deploy:
- Check if updating the properties metavalues will affect anyone using the tilesets from Mapbox? Do we need to keep the same schema?
- Verify that embed.html is working

After first deploy:
- Enhancing Winston logs to go straight to Heroku or other service
- Adding a new API endpoint that requires API keys

Optimization:
- Catch logs for API requests that are errors
- Reading over SQL injection in Prisma docs
- Adding a Mapbox updates table, with "Recent update" to help when emptying mapboxgl cache after tile update
- Improving research updates (currently expensive deleteMany and createMany on any update)
- Improving use of Typescript (pretty lazy right now)
- Checking and removing duplicate research entries (requires collaboration with research team)
- Providing more options to react select lists on front page? Is it necessary or 50 initial results is enough?

Aspirational:
- Integrating researcher to-do list with the researcher dashboard section
- Adding ability to load other polygons for researchers to draw with more context (perhaps just changing the underlying Style?)
- Adding more refined permissions to enable external researchers to edit only certain polygons or sets of polygons
