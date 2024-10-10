import { handler as api } from './nld_api/index.mjs';
import { handler as search } from './nld_search/index.mjs';

let get_api_response = await api({
  httpMethod : "GET",
  queryStringParameters : {
    maps : 'territories',
    // name : 'nʉmʉnʉʉ-comanche'
    position : '49.18842944,-122.83028873'
  }
});
const getAPIResponseBody = JSON.parse(get_api_response.body);
console.log("--- START GET API RESPONSE TEST ---");
if(getAPIResponseBody.error) {
  console.log(getAPIResponseBody.error)
} else {
  console.log(getAPIResponseBody.map(row => row.properties.Name));
  console.log(getAPIResponseBody.length);
}
console.log("--- END GET API RESPONSE TEST ---");

let post_api_response = await api({
  httpMethod : "POST",
  body : JSON.stringify({
    maps : "territories",
    polygon_geojson : {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -105.556640625,
                  58.17070248348609
                ],
                [
                  -107.09472656249999,
                  57.11238500793404
                ],
                [
                  -104.853515625,
                  56.145549500679074
                ],
                [
                  -98.6572265625,
                  56.70450561416937
                ],
                [
                  -97.55859375,
                  57.89149735271034
                ],
                [
                  -99.8876953125,
                  58.49369382056807
                ],
                [
                  -103.7548828125,
                  58.768200159239576
                ],
                [
                  -105.556640625,
                  58.17070248348609
                ]
              ]
            ]
          }
        }
      ]
    }
  })
});

const postAPIResponseBody = JSON.parse(post_api_response.body);
console.log("--- START POST API RESPONSE TEST ---");
if(postAPIResponseBody.error) {
  console.log(postAPIResponseBody.error)
} else {
  console.log(postAPIResponseBody.map(row => row.properties.Name));
  console.log(postAPIResponseBody.length);
}
console.log("--- END POST API RESPONSE TEST ---");


let search_response = await search({
  httpMethod : "GET",
  queryStringParameters : {
    s : 'pomo',
    category : "territories",
    geosearch : true
  }
});
const searchResponseBody = JSON.parse(search_response.body);
console.log("--- START SEARCH RESPONSE TEST ---");
if(searchResponseBody.error) {
  console.log(searchResponseBody.error)
} else {
  console.log(searchResponseBody)
  console.log(searchResponseBody.map(row => row.name));
  console.log(searchResponseBody.length);
}
console.log("--- END SEARCH RESPONSE TEST ---");
