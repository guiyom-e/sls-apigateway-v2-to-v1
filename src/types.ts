import { RestApiRequestEvent, HttpApiRequestEvent } from "./apiPayload";

/** Lambda input event type for both HTTP API and REST API, when using lambda proxy integration */
export type ApiEvent = RestApiRequestEvent | HttpApiRequestEvent;

export const isRestApiEvent = (event: ApiEvent): event is RestApiRequestEvent =>
  event.version === "1.0";

export type ApiResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};
