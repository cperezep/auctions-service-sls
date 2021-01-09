import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { Response } from 'src/models/response.model';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

export const successResponse = (response: Record<string, unknown>): Response => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const notFoundResponse = (response: Record<string, unknown>): Response => {
  return {
    statusCode: 404,
    body: JSON.stringify(response),
  };
};

export const errorResponse = (response: Record<string, unknown>): Response => {
  return {
    statusCode: 500,
    body: JSON.stringify(response),
  };
};
