import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import * as createHttpError from 'http-errors';
import { successResponse, ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Auction } from 'src/models/auction.model';
import { getAuctionById } from '../getAuction/handler';

import schema from './schema';

const dynamodb = new DynamoDB.DocumentClient();

const placeBid: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: ValidatedAPIGatewayProxyEvent<typeof schema>,
) => {
  const { id } = event.pathParameters;
  const { amount } = event.body;
  const auction = await getAuctionById(id);

  if (amount <= auction.highestBid.amount) {
    throw createHttpError(403, `Your bid must be higher than ${auction.highestBid.amount}!`);
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: { ':amount': amount },
    ReturnValues: 'ALL_NEW',
  };

  let updatedAuction: Auction;

  try {
    const result = await dynamodb.update(params).promise();

    updatedAuction = result.Attributes as Auction;
  } catch (error) {
    console.error(error);
    throw createHttpError(500, error);
  }

  return successResponse({ data: { updatedAuction } });
};

export const main = middyfy(placeBid);
