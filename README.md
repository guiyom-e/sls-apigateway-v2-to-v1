# sls-apigateway-v2-to-v1

- [Types for API Gateway Lambda Proxy Integration](./src/apiPayload.ts) based on [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html).
- Template helpers to handle both input versions from API Gateway v1 and v2. You should update the [`constants.ts` file](./src/apiPayload.ts) to fit your project urls.
