import { CloudFormationResource } from 'src/models/cloudFormationResources.model';

export const AuctionsTable: CloudFormationResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'AuctionsTable-${self:provider.stage}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'status', AttributeType: 'S' },
      { AttributeName: 'endingAt', AttributeType: 'S' },
    ],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'statusAndEndingAt',
        KeySchema: [
          // Partition key
          { AttributeName: 'status', KeyType: 'HASH' },
          // Sort key
          { AttributeName: 'endingAt', KeyType: 'RANGE' },
        ],
        // A projection is the set of attributes that is copied from a table into a secondary index
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  },
};
