import postgres from 'postgres'

import { assembleFeatures } from './common.mjs'

export const handlePostRequest = async(event) => {
  let maps = false;
  let polygon_geojson = false;

  if(event && event.body) {
    let body = JSON.parse(event.body);
    maps = body.maps;
    polygon_geojson = body.polygon_geojson;
  }

  if(!maps || maps.trim() === "") {
    const response = {
      statusCode: 400,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ error : "You did not include a maps type with your request (territories, languages, and/or treaties)" })
    };
    return response;
  }

  if(!polygon_geojson) {
    const response = {
      statusCode: 400,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ error : "Please provide an geoJSON polygon" })
    };
    return response;
  }

  if(maps && polygon_geojson) {

    const mapCategories = maps.split(',');
    // If only requesting one big shape, redirect to big geojson
		if(mapCategories.length === 1 && !polygon_geojson) {
      let urlLocation = false;
			if(mapCategories[0] === 'territories') {
				urlLocation = 'https://d2u5ssx9zi93qh.cloudfront.net/territories.geojson';
			} else if (mapCategories[0] === 'languages') {
				urlLocation = 'https://d2u5ssx9zi93qh.cloudfront.net/languages.geojson';
			} else if (mapCategories[0] === 'treaties') {
				urlLocation = 'https://d2u5ssx9zi93qh.cloudfront.net/treaties.geojson';
			}
      if(urlLocation) {
        const response = {
          statusCode: 301,
          headers: {
            Location: urlLocation
          }
        };
        return response;
      }
    }

    if(polygon_geojson.features.length > 0) {
      // Connect to DB
      const sql = postgres('postgres://postgres.qdsobbmoufhgbmmgxgsn:je4BgGlw5HnAFhQQ@aws-0-us-west-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x&pgbouncer=true&connection_limit=1')
      // Otherwise start the main query
      let topSelect = sql`SELECT id, name, color, slug, category, ST_AsGeoJSON(geometry) as geojson FROM "Polygon"`

      let categoryWhere = false;
      let categorySelects = [];
      if(mapCategories.length > 0) {
        mapCategories.forEach(category => {
          categorySelects.push(categoryWhere ? sql`OR category = ${category}` : sql`category = ${category}`);
          categoryWhere = true;
        })
      }
      let positionWhere = false;
      let positionSelect = [];
      if(polygon_geojson) {
        polygon_geojson.features.forEach(feature => {
          const geometry = JSON.stringify(feature.geometry);
          positionSelect.push(positionWhere ? sql`OR ST_Intersects(geometry, ST_GeomFromGeoJSON(${geometry}))` : sql`ST_Intersects(geometry, ST_GeomFromGeoJSON(${geometry}))`)
          positionWhere = true;
        })
      }

      // Execute query
      try {
        const res = await sql`
          ${topSelect}
          WHERE (
            published = 'true'
          )
          AND (
            ${categorySelects}
          )
          ${positionSelect.length > 0 ? sql`AND (
            ${positionSelect}
          )` : sql``}
        `

        // Putting together list
        const featureList = assembleFeatures(res);

        if(featureList.length > 500) {
          const response = {
            statusCode: 400,
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({ error : "Your request had over 500 results. It's probably best to get our full GeoJSON directly! See https://api-docs.native-land.ca/full-geojsons" })
          };
          return response;
        } else {
          const response = {
            statusCode: 200,
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(featureList)
          };
          return response;
        }
      } catch (err) {
        const response = {
          statusCode: 400,
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ error : `Something went wrong. Here is the error message: ${JSON.stringify(err)}` }),
        };
        return response;
      }

    } else {
      const response = {
        statusCode: 400,
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ error : "Please provide an geoJSON polygon (your geojson was empty)" })
      };
      return response;
    }

  }

}
