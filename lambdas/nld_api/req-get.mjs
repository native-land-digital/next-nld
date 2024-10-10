import 'dotenv/config'

import { assembleFeatures } from './common.mjs'

export const handleGetRequest = async(event, sql) => {

  let maps = false;
  let names = false;
  let position = false;

  const log = {
    type : '',
    headers : {
      ip : '',
      ref : ''
    },
    query : '',
    success : '',
    redirect : '',
    error : ''
  };

  if(event && event.queryStringParameters) {
    log.type = 'GET';
    log.query = JSON.stringify(event.queryStringParameters)
    maps = event.queryStringParameters.maps;
    names = event.queryStringParameters.name;
    position = event.queryStringParameters.position;
  }

  if(event.headers) {
    if(event.headers['X-Real-IP']) {
      log.headers.ip = event.headers['X-Real-IP'];
    }
    if(event.headers['referer']) {
      log.headers.ref = event.headers['referer'];
    }
  }

  if(!maps || maps.trim() === "") {
    log.error = "You did not include a maps type with your request (territories, languages, and/or treaties)";
    console.log(log)
    const response = {
      statusCode: 400,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ error : log.error })
    };
    return response;
  } else {
    const mapCategories = maps.split(',');
    const splitNames = names ? names.split(',') : [];
    // If only requesting one big shape, redirect to big geojson
		if(mapCategories.length === 1 && !position && !names) {
      let urlLocation = false;
			if(mapCategories[0] === 'territories') {
        log.redirect = 'territories';
				urlLocation = 'https://d2u5ssx9zi93qh.cloudfront.net/territories.geojson';
			} else if (mapCategories[0] === 'languages') {
        log.redirect = 'languages';
				urlLocation = 'https://d2u5ssx9zi93qh.cloudfront.net/languages.geojson';
			} else if (mapCategories[0] === 'treaties') {
        log.redirect = 'treaties';
				urlLocation = 'https://d2u5ssx9zi93qh.cloudfront.net/treaties.geojson';
			}
      if(urlLocation) {
        console.log(log);
        const response = {
          statusCode: 301,
          headers: {
            Location: urlLocation
          }
        };
        return response;
      }
    }
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
    let positionSelect = [];
    if(position) {
      const splitPosition = position.split(',');
      const latitude = parseFloat(splitPosition[0]);
      const longitude = parseFloat(splitPosition[1]);
      const geometry = JSON.stringify({ type : "Point", coordinates : [ longitude, latitude ] });
      positionSelect.push(sql`ST_Contains(geometry, ST_GeomFromGeoJSON(${geometry}))`)
    }
    let nameWhere = false;
    let nameSelects = [];
    if(splitNames.length > 0) {
      splitNames.forEach(name => {
        nameSelects.push(nameWhere ? sql`OR slug = ${encodeURIComponent(name).toLowerCase()}` : sql`slug = ${encodeURIComponent(name).toLowerCase()}`);
        nameWhere = true;
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
        ${nameSelects.length > 0 ? sql`AND (
          ${nameSelects}
        )` : sql``}
      `

      // Putting together list
      const featureList = assembleFeatures(res);

      if(featureList.length > 500) {
        log.error = "Your request had over 500 results. It's probably best to get our full GeoJSON directly! See https://api-docs.native-land.ca/full-geojsons";
        console.log(log)
        const response = {
          statusCode: 400,
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ error : log.error })
        };
        return response;
      } else {
        log.success = featureList.length;
        console.log(log)
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
      log.error = `Something went wrong. Here is the error message: ${JSON.stringify(err)}`;
      console.log(log)
      const response = {
        statusCode: 400,
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ error : log.error}),
      };
      return response;
    }

  }
}
