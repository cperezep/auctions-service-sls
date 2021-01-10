import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import middyErrorHandler from '@middy/http-error-handler';

// http-json-body-parser: Automatically parses HTTP requests with JSON body and converts the body into an object. Also handles gracefully broken JSON if used in combination of httpErrorHandler.
// http-event-normalizer: Normalizes HTTP events by adding an empty object for queryStringParameters, multiValueQueryStringParameters or pathParameters if they are missing.
// http-error-handler: Creates a proper HTTP response for errors that are created with the http-errors module and represents proper HTTP errors.
export const middyfy = (handler) => {
  return middy(handler).use([middyJsonBodyParser(), middyErrorHandler()]);
};
