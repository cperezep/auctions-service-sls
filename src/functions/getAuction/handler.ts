import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { successResponse, notFoundResponse, errorResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Auction } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

const getAuction: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  let auction: Auction;
  const { id } = event.pathParameters;

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
    return errorResponse({ message: error });
  }

  if (!auction) {
    return notFoundResponse({ message: `Auction with ID ${id} not found!` });
  }

  return successResponse({ data: { auction } });
};

export const main = middyfy(getAuction);
