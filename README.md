# Serverless - AWS Node.js Typescript

## Installation/deployment instructions

- Run `npx sls deploy -v` to deploy this stack to AWS

## Test services

The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/{function}/schema.ts` JSON-Schema definition.

- Requesting path and methods not defined will result in API Gateway returning a `403` HTTP error code.
- Sending a request to specific function with an wrong payload will result in API Gateway returning a `400` HTTP error code
- Sending a request to specific function with a payload following its JSON-Schema definition will result in API Gateway returning a `200` HTTP status code.

### Locally

In order to test the function locally, run the following command:

- `npx sls invoke local -f {name-function} --path src/functions/{function}/mock.json` if you're using NPM

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and test in Postman the deployed application.

## Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - Containing code base and configuration for your lambda functions
- `libs` - Containing shared code base between your lambdas

```
.
├── src
│   ├── functions            # Lambda configuration and source code folder
│   │   ├── {function}
│   │   │   ├── handler.ts   # Lambda source code
│   │   │   ├── index.ts     # Lambda Serverless configuration
│   │   │   ├── mock.json    # Lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts    # Lambda input event JSON-Schema
│   │   │
│   │   └── index.ts         # Import/export of all lambda configurations
│   │
│   └── libs                 # Lambda shared code
│       └── apiGateway.ts    # API Gateway specific helpers
│
├── package.json
├── serverless.ts            # Serverless service file
├── tsconfig.json            # Typescript compiler configuration
└── webpack.config.js        # Webpack configuration
```
