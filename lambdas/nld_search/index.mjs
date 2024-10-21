import postgres from 'postgres'
import 'dotenv/config'

// Connect to DB
const sql = postgres(process.env.DATABASE_URL.replace('?schema=public', ''))

export const handler = async (event) => {

  let search = false;
  let category = false;
  let geosearch = false;
  let id = false;

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
    search = event.queryStringParameters.s;
    category = event.queryStringParameters.category;
    geosearch = event.queryStringParameters.geosearch;
    id = event.queryStringParameters.id;
  }

  if(event.headers) {
    if(event.headers['X-Real-IP']) {
      log.headers.ip = event.headers['X-Real-IP'];
    }
    if(event.headers['referer']) {
      log.headers.ref = event.headers['referer'];
    }
  }

  if(event.headers) {
    const headers = event.headers;
    if(headers.referer) {
      if(headers.referer.indexOf('https://native-land.ca') === -1 && headers.referer.indexOf('nld-projects.vercel.app') === -1 && headers.referer.indexOf('http://localhost') === -1) {
        log.error = "This is a endpoint restricted to Native Land only";
        console.log(log)
        const response = {
          statusCode: 400,
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ error : log.error })
        };
        return response;
      }
    }
  }

  // Otherwise start the main query
  let topSelect = sql`SELECT "Entry".id, "Entry".name, "Entry".category FROM "Entry"`

  if(geosearch) {
    topSelect = sql`
      SELECT "Entry".id, "Entry".name, "Entry".category, ST_AsGeoJSON(ST_Centroid("Polygon".geometry)) as centroid, ST_AsGeoJSON(ST_Envelope("Polygon".geometry)) as bounds
      FROM "Entry"
      LEFT JOIN "Polygon"
      ON "Entry".id = "Polygon"."entryId"
    `
  }

  let idWhere = false;
  if(id) {
    idWhere = sql`"Entry".id = ${id}`
  }

  let categoryWhere = false;
  if(category) {
    categoryWhere = sql`"Entry".category = ${category}`
  }

  let searchWhere = false;
  if(search) {
    searchWhere = sql`lower("Entry".name) LIKE ${`%${search}%`}`
  }

  // Execute query
  try {
    const res = await sql`
      ${topSelect}
      WHERE (
        "Entry".published = TRUE
      )
      ${idWhere ? sql`
        AND (
          ${idWhere}
      )` : sql``}
      ${categoryWhere ? sql`
        AND (
          ${categoryWhere}
      )` : sql``}
      ${searchWhere ? sql`
        AND (
          ${searchWhere}
      )` : sql``}
      LIMIT 5
    `

    // Putting together list
    const responseList = [];
    res.forEach(row => {
      if(row.centroid && row.bounds) {
        responseList.push({
          id : row.id,
          category : row.category,
          name : row.name,
          centroid : JSON.parse(row.centroid),
          bounds : JSON.parse(row.bounds)
        })
      } else {
        responseList.push({
          id : row.id,
          category : row.category,
          name : row.name
        })
      }
    })
    log.success = responseList.length;
    console.log(log)
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(responseList)
    };
    return response;

  } catch (err) {
    console.log(err)
    log.error = `Something went wrong. Here is the error message: ${JSON.stringify(err)}`;
    console.log(log)
    const response = {
      statusCode: 400,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ error : log.error }),
    };
    return response;
  }


};
