
/**
 * Types for the input event of a lambda function using lambda proxy integration with API Gateway.
 * 
 * The input event can be of two types:
 * - `RestApiRequestEvent`: when using lambda proxy integration with REST API (API Gateway v1)
 * - `HttpApiRequestEvent`: when using lambda proxy integration with HTTP API (API Gateway v2)
 */

/** @example
 * {
 *   "cognito:groups": "group1,group2",
 *   "cognito:username": "bob@example.com",
 *   "email": "bob@example.com"
 * }
 */
type Claims = {
  [key: string]: string;
};

type ClientCertValidity = {
  notBefore: string;
  notAfter: string;
};

type ClientCert = {
  clientCertPem: string;
  subjectDN: string;
  issuerDN: string;
  serialNumber: string;
  validity: ClientCertValidity;
};

type Identity = {
  accessKey: string | null;
  accountId: string | null;
  caller: string | null;
  cognitoAuthenticationProvider: string | null;
  cognitoAuthenticationType: string | null;
  cognitoIdentityId: string | null;
  cognitoIdentityPoolId: string | null;
  principalOrgId: string | null;
  sourceIp: string;
  user: string | null;
  userAgent: string;
  userArn: string | null;
  clientCert: ClientCert;
};

type RestApiRequestContext = {
  accountId: string;
  apiId: string;
  authorizer: {
    claims: Claims;
    scopes: string[] | null;
  };
  domainName: string;
  domainPrefix: string;
  extendedRequestId: string;
  httpMethod: string;
  identity: Identity;
  path: string;
  protocol: string;
  requestId: string;
  requestTime: string;
  requestTimeEpoch: number;
  resourceId: string | null;
  resourcePath: string;
  stage: string;
};

/** Lambda input event type for REST API, when using lambda proxy integration
 *
 * See https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
 */
export type RestApiRequestEvent = {
  version: "1.0";
  resource: string;
  path: string;
  httpMethod: string;
  headers: Record<string, string>;
  multiValueHeaders: Record<string, string[]>;
  queryStringParameters: Record<string, string>;
  multiValueQueryStringParameters: Record<string, string[]>;
  requestContext: RestApiRequestContext;
  pathParameters: Record<string, string> | null;
  stageVariables: Record<string, string> | null;
  body: string;
  isBase64Encoded: boolean;
};

type Authentication = {
  clientCert: ClientCert;
};

/** @example
 * {
 *   "cognito:groups": "[group1 group2]",
 *   "cognito:username": "bob@example.com",
 *   "email": "bob@example.com"
 * }
 */
type JwtClaims = {
  [key: string]: string;
};

type JwtAuthorizer = {
  claims: JwtClaims;
  scopes: string[] | null;
};

type Authorizer = {
  jwt: JwtAuthorizer;
};

type RequestContextHttp = {
  /** @example "GET" */
  method: string;
  /** @example "/my/path" */
  path: string;
  /** @example "HTTP/1.1" */
  protocol: string;
  /** @example "192.0.2.1" */
  sourceIp: string;
  userAgent: string;
};

type RequestContextTime = {
  time: string;
  timeEpoch: number;
};

type HttpApiRequestContext = {
  /** @example "123456789012" */
  accountId: string;
  apiId: string;
  authentication: Authentication;
  authorizer: Authorizer;
  domainName: string;
  domainPrefix: string;
  http: RequestContextHttp;
  requestId: string;
  /** @example "$default" */
  routeKey: string;
  /** @example "$default" */
  stage: string;
  time: RequestContextTime;
};

/** Lambda input event type for HTTP API, when using lambda proxy integration
 *  
 * See https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html  
 */
export type HttpApiRequestEvent = {
  version: "2.0";
  /** @example "$default" */
  routeKey: string;
  /** @example "/my/path" */
  rawPath: string;
  /** @example "parameter1=value1&parameter1=value2&parameter2=value" */
  rawQueryString: string;
  cookies: string[];
  /** @example { "singleValueHeader": "value1", "multiValueHeader": "value1,value2" } */
  headers: Record<string, string>;
  /** @example { "singleValueParam": "value1", "multiValueParam": "value1,value2" } */
  queryStringParameters: Record<string, string>;
  requestContext: HttpApiRequestContext;
  body: string;
  pathParameters: Record<string, string>;
  isBase64Encoded: boolean;
  stageVariables: Record<string, string>;
};