import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { Auction, AuctionStatus } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

export const closeAuction = async (auction: Auction): Promise<Auction> => {
  const id = auction.id;
  const status = AuctionStatus.CLOSED;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    // status is a reserved word so is necessary to rename it
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': status,
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamodb.update(params).promise();

  return result.Attributes as Auction;
};
