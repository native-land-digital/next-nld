import postgres from 'postgres'

export const handler = async (event) => {

  let maps = false;
  let names = false;
  let position = false;

  if(event && event.queryStringParameters) {
    maps = event.queryStringParameters.maps;
    names = event.queryStringParameters.name;
    position = event.queryStringParameters.position;
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
  } else {
    const mapCategories = maps.split(',');
    const splitNames = names ? names.split(',') : [];
    // If only requesting one big shape, redirect to big geojson
		if(mapCategories.length === 1 && !position && !names) {
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
    // Connect to DB
    const sql = postgres('postgres://postgres.pwyuqqwvcpqieizmchxa:VerNlAa9IburR1Ag@aws-0-us-west-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x&pgbouncer=true&connection_limit=1', {
      ssl : false
    })
    // Otherwise start the main query
    // const featureList = [];
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
      const point = sql`POINT(${longitude} ${latitude})`
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
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(res)
      };
      return response;
    } catch (err) {
      // await pool.end();
      const response = {
        statusCode: 400,
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(err),
      };
      return response;
    }

  }

};
