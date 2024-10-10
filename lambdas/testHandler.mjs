import { handler } from './GET_nld_api/index.mjs';

let handlerResponse = await handler({
  queryStringParameters : {
    maps : 'territories',
    // name : 'nʉmʉnʉʉ-comanche'
    position : '49.18842944,-122.83028873'
  }
});
console.log(handlerResponse)
