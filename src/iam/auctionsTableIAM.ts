export const AuctionsTableIAM = {
  Effect: 'Allow',
  Action: ['dynamodb:PutItem', 'dynamodb:Scan'],
  Resource: '${self:custom.AuctionsTable.arn}',
};