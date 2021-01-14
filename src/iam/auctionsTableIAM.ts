export const AuctionsTableIAM = {
  Effect: 'Allow',
  Action: ['dynamodb:PutItem', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:UpdateItem', 'dynamodb:Query'],
  Resource: [
    '${self:custom.AuctionsTable.arn}',
    // Specify resource of global secondary index: arn/index/statusAndEndDate
    { 'Fn::Join': ['/', ['${self:custom.AuctionsTable.arn}', 'index', 'statusAndEndDate']] },
  ],
};
