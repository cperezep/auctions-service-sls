import { CloudFormationResource } from 'src/models/cloudFormationResources.model';

export const AuctionsTable: CloudFormationResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'AuctionsTable-${self:provider.stage}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
  },
};
