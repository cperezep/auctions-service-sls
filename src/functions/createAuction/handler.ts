import 'source-map-support/register';

import { v4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import * as createError from 'http-errors';
import type { ValidatedEventAPIGatewayProxyEvent, ValidatedAPIGatewayProxyEvent } from '@libs/apiGateway';
import { createdResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Auction, AuctionStatus } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

const getAuction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: ValidatedAPIGatewayProxyEvent<typeof schema>,
) => {
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const auction: Auction = {
    id: v4(),
    title: event.body.title,
    status: AuctionStatus.OPEN,
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: { amount: 0 },
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
    throw createError(500, error);
  }

  return createdResponse({ data: { auction } });
};

export const main = middyfy(getAuction);
