import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as createError from 'http-errors';
import { successResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Auction } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

export const getAuctionById = async (id: string): Promise<Auction> => {
  let auction: Auction;
  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();

    auction = result.Item as Auction;
  } catch (error) {
    console.error(error);
    throw createError(500, error);
  }

  if (!auction) {
    throw createError(404, `Auction with ID ${id} not found!`);
  }

  return auction;
};

const getAuction: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id);

  return successResponse({ data: { auction } });
};

export const main = middyfy(getAuction);
