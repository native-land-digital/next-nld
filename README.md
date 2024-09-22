## Dev Setup Notes

- https://jean-marc.io/blog/setup-next.js-with-postgres-prisma-docker
- https://hub.docker.com/r/postgis/postgis

- Make sure docker is started
- npm run start:db
- npm run dev

- https://nextjs.org/docs/app/building-your-application/styling/css-in-js


To build:
- Endpoint for the geocoder
- Endpoint for general list of territories, languages and treaties (maybe lazy load a list somehow?)
- Updating link on feature lists to be dynamic on front map (link to current site)
- mobile layout front page map
- translation: should only rebuild the front page, how to provide strings to it?
- reducing size of bulma, creating custom build, or just writing 100% custom CSS]
- Adding modal to front loader

Next up:

- Uploading and downloading geoJSON
- Adding other fields and repeater fields, WYSIWYG stuff

- API
- Adding good error handling for API responses across app
- Tying in the research to-do list directly on the researcher page
- Would they like to be able to load other polygons to draw better relationally?

## To fix

- Working out the docker image for Postgres/PostGIS (only for development!!)

docker compose build
docker compose up


- Not taking Dockerfile values when creating Postgres DB (taking local Postgres stuff instead?!)
- Making sure Typescript is actually being used, lol, not just .tsx files
- Adding links into the footers
- Adding the HTML content and layout for the pages
- Issue with Mapbox glyphs not showing (maybe need a different recipe?)
- Setup an external blog and move posts over to there

- https://mapscaping.com/polygons-vs-multipolygons-in-gis/

## Database structure notes

- Polygons
  - Type


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
