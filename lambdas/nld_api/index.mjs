import { handleGetRequest } from './req-get.mjs';
import { handlePostRequest } from './req-post.mjs';

export const handler = async (event) => {

  let response = false;
  if (event.httpMethod === 'POST') {
    response = handlePostRequest(event);
  } else if(event.httpMethod === 'GET') {
    response = handleGetRequest(event);
  }
  return response;

};
