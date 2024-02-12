import { restApiResponseFormatterInPlace } from './restApiResponseFormatter';
import { ApiEvent, ApiResponse, isRestApiEvent } from './types';

/** Format the response of a REST API event or HTTP API event with the PayloadFormatVersion 2.0 of the AWS Lambda Proxy Integration for ApiGatewayV2 (HTTP API).
 * 
 * If the response is not a JSON object or already has a property statusCode, it is expected to be correctly formatted.
 * 
 * @param event Lambda input event from REST API Lambda integration
 * @param response Lambda handler response
 * 
 * @returns The response (modified in place) formatted with:
 * - statusCode: 200
 * - headers:
 *  - Content-Type: application/json.
 *  - Access-Control-Allow-Origin: Origin if allowed
 * - body: stringified function's response.
 */
export const genericApiResponseFormatterInPlace = <
  INPUT_EVENT extends ApiEvent,
  LAMBDA_HANDLER_RESPONSE extends Record<string, unknown> & Partial<ApiResponse>
>(
  event: INPUT_EVENT,
  response: LAMBDA_HANDLER_RESPONSE
) => {
  if (
    typeof response !== "object" ||
    response.statusCode !== undefined ||
    !isRestApiEvent(event)
  ) {
    return response;
  }

  restApiResponseFormatterInPlace(event, response);

  return response;
};
