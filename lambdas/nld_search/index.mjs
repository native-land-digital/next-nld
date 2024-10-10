import postgres from 'postgres'
import 'dotenv/config'

export const handler = async (event) => {

  let search = false;
  let category = false;
  let geosearch = false;

  if(event && event.queryStringParameters) {
    console.log(JSON.stringify(event.queryStringParameters))
    search = event.queryStringParameters.s;
    category = event.queryStringParameters.category;
    geosearch = event.queryStringParameters.geosearch;
  }

  if(event.headers) {
    console.log(JSON.stringify(event.headers))
    const headers = event.headers;
    if(headers.referer) {
      if(headers.referer.indexOf('https://native-land.ca') === -1 && headers.referer.indexOf('nld-projects.vercel.app') === -1 && headers.referer.indexOf('http://localhost') === -1) {
        const response = {
          statusCode: 400,
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ error : "This is a endpoint restricted to Native Land only" })
        };
        return response;
      }
    }
  }

  // Connect to DB
  const sql = postgres(process.env.DATABASE_URL.replace('?schema=public', ''))
  // Otherwise start the main query
  let topSelect = sql`SELECT id, name, category FROM "Polygon"`

  if(geosearch) {
    topSelect = sql`SELECT id, name, category, ST_AsGeoJSON(ST_Centroid(geometry)) as centroid, ST_AsGeoJSON(ST_Envelope(geometry)) as bounds FROM "Polygon"`
  }

  let categoryWhere = false;
  if(category) {
    categoryWhere = sql`category = ${category}`
  }

  let searchWhere = false;
  if(search) {
    searchWhere = sql`lower(name) LIKE ${`%${search}%`}`
  }

  console.log(search)

  // Execute query
  try {
    const res = await sql`
      ${topSelect}
      WHERE (
        published = 'true'
      )
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
    const response = {
      statusCode: 400,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ error : `Something went wrong. Here is the error message: ${JSON.stringify(err)}` }),
    };
    return response;
  }


};
