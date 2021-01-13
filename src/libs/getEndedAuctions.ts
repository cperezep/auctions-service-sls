import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { Auction } from 'src/models/auction.model';
import { QueryInput, AttributeValue } from 'aws-sdk/clients/dynamodb';

const dynamodb = new DynamoDB.DocumentClient();

export const getEndedAuctions = async (): Promise<Auction[]> => {
  const now: AttributeValue = {
    S: new Date().toISOString(),
  };
  const status: AttributeValue = {
    S: 'OPEN',
  };

  const params: QueryInput = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndingAt',
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
