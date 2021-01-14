import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as createError from 'http-errors';
import { successResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Auction } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

const getAuctions: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  let auctions: Auction[];
  const { status } = event.queryStringParameters;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    // status is a reserved word so is necessary to rename it
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeValues: {
      ':status': status,
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  try {
    const result = await dynamodb.query(params).promise();

    auctions = result.Items as Auction[];
  } catch (error) {
    console.error(error);
    throw createError(500, error);
  }

  return successResponse({ data: { auctions } });
};

export const main = middyfy(getAuctions);
