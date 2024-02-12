import { ALLOWED_ORIGINS } from "./constants";
import { ApiEvent, ApiResponse } from "./types";

export const getAccessControlAllowOriginHeader = <INPUT_EVENT extends ApiEvent>(
  event: INPUT_EVENT
):
  | {
      "Access-Control-Allow-Origin": string;
    }
  | Record<string, never> => {
  const origin = event.headers?.origin;

  if (
    origin === undefined ||
    event.requestContext?.stage === undefined ||
    !ALLOWED_ORIGINS?.[event.requestContext?.stage]?.includes(origin)
  ) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
  };
};

/** Format the response of a REST API event with the PayloadFormatVersion 2.0 of the AWS Lambda Proxy Integration for ApiGatewayV2 (HTTP API).
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
 *
 */
export const restApiResponseFormatterInPlace = <
  REST_API_EVENT extends ApiEvent,
  LAMBDA_HANDLER_RESPONSE extends Record<string, unknown> & Partial<ApiResponse>
>(
  event: REST_API_EVENT,
  response: LAMBDA_HANDLER_RESPONSE
): ApiResponse => {
  // If the response is not a JSON object or already has a property statusCode, it is expected to be correctly formatted.
  if (typeof response !== "object" || response.statusCode !== undefined) {
    return response as ApiResponse;
  }

  const stringifiedBody = JSON.stringify(response);

  // Clean response
  for (const key in response) {
    delete response[key];
  }

  response.body = stringifiedBody;
  response.statusCode = 200;
  response.headers = {
    "Content-Type": "application/json",
    // Required for CORS support to work
    ...getAccessControlAllowOriginHeader(event),
  };

  return response as ApiResponse;
};
