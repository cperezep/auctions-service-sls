import 'source-map-support/register';

import { v4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import type { ValidatedEventAPIGatewayProxyEvent, ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
import { successResponse, errorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Auction } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

const getAuction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: ValidatedAPIGatewayProxyEvent<typeof schema>,
) => {
  const auction: Auction = {
    id: v4(),
    name: event.body.name,
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: auction,
      })
      .promise();
  } catch (error) {
    console.error(error);
    return errorResponse({ message: error });
  }

  return successResponse({ data: { auction } });
};

export const main = middyfy(getAuction);
