import type { AWS } from '@serverless/typescript';

// Functions
import { createAuction, getAuctions } from './src/functions';

// IAM
import { AuctionsTableIAM } from './src/iam/auctionsTableIAM';

// Resources
import resources, { AuctionsTable } from './src/resources';

// Utils
import { ref } from './src/libs/intrinsic';

const serverlessConfiguration: AWS = {
  service: 'auctions-service',
  frameworkVersion: '2',
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      AUCTIONS_TABLE_NAME: '${self:custom.AuctionsTable.name}',
    },
    stage: "${opt:stage, 'dev'}",
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [AuctionsTableIAM],
  },
  functions: { createAuction, getAuctions },
  resources: {
    Resources: {
      AuctionsTable,
    },
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    AuctionsTable: {
      name: ref(resources, AuctionsTable),
      arn: { 'Fn::GetAtt': ['AuctionsTable', 'Arn'] },
    },
  },
};

module.exports = serverlessConfiguration;
