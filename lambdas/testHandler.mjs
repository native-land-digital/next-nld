import { handler } from './nld_api/index.mjs';

let handlerResponse = await handler({
  queryStringParameters : {
    maps : 'territories',
    name : 'nʉmʉnʉʉ-comanche'
    // position : '49.23811577,-123.1282452'
  }
});
console.log(handlerResponse)
