import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { Auction, AuctionStatus } from 'src/models/auction.model';

const dynamodb = new DynamoDB.DocumentClient();

export const getEndedAuctions = async (): Promise<Auction[]> => {
  const now = new Date().toISOString();
  const status = AuctionStatus.OPEN;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    // status is a reserved word so is necessary to rename it
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': status,
      ':now': now,
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  const result = await dynamodb.query(params).promise();

  return result.Items as Auction[];
};
