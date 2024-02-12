import middy from 'middy';

import { genericApiResponseFormatterInPlace } from './apiResponseFormatter';
import { ApiEvent, isRestApiEvent } from './types';

/** Middy middleware that reimplements the PayloadFormatVersion 2.0 of the AWS Lambda Proxy Integration for ApiGatewayV2 (HTTP API) for ApiGatewayV1 (REST API).
 * 
 * If the Lambda function returns valid JSON and doesn't return a statusCode, format the response with:
    - statusCode: 200
    - headers:
      - Content-Type: application/json.
      - Access-Control-Allow-Origin: Origin if allowed 
    - body: stringified function's response.
 */
export const apiResponseFormatterMiddleware = <
  INPUT_EVENT extends ApiEvent,
  LAMBDA_HANDLER_RESPONSE extends Record<string, unknown> & {
    statusCode?: number;
    headers?: Record<string, string>;
    body?: string;
  }
>(): middy.MiddlewareObject<INPUT_EVENT, LAMBDA_HANDLER_RESPONSE> => ({
  after: ({ event, response }, next) => {
    if (
      typeof response !== "object" ||
      response.statusCode !== undefined ||
      // HTTP API event doesn't have resourceId
      !isRestApiEvent(event)
    ) {
      next();

      return;
    }

    genericApiResponseFormatterInPlace(event, response);

    next();
  },
});
