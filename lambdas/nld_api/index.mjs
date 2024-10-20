import postgres from 'postgres'
import { handleGetRequest } from './req-get.mjs';
import { handlePostRequest } from './req-post.mjs';

// Connect to DB
// const sql = postgres(process.env.DATABASE_URL.replace('?schema=public', ''))

export const handler = async (event) => {
const sql = postgres(process.env.DATABASE_URL.replace('?schema=public', ''))

  let response = false;
  if (event.httpMethod === 'POST') {
    response = handlePostRequest(event, sql);
  } else if(event.httpMethod === 'GET') {
    response = handleGetRequest(event, sql);
  }
  return response;

};
