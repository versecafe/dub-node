// File generated from our OpenAPI spec by Stainless.

import * as Core from './core';
import * as Errors from './error';
import { type Agent } from './_shims/index';
import * as Uploads from './uploads';
import * as API from 'dub/resources/index';

export interface ClientOptions {
  /**
   * Defaults to process.env['DUB_API_KEY'].
   */
  token?: string | undefined;

  projectSlug?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['DUB_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/** API Client for interfacing with the Dub API. */
export class Dub extends Core.APIClient {
  token: string;
  projectSlug: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Dub API.
   *
   * @param {string | undefined} [opts.token=process.env['DUB_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.projectSlug]
   * @param {string} [opts.baseURL=process.env['DUB_BASE_URL'] ?? https://api.dub.co] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('DUB_BASE_URL'),
    token = Core.readEnv('DUB_API_KEY'),
    projectSlug = null,
    ...opts
  }: ClientOptions = {}) {
    if (token === undefined) {
      throw new Errors.DubError(
        "The DUB_API_KEY environment variable is missing or empty; either provide it, or instantiate the Dub client with an token option, like new Dub({ token: 'My Token' }).",
      );
    }

    const options: ClientOptions = {
      token,
      projectSlug,
      ...opts,
      baseURL: baseURL || `https://api.dub.co`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });
    this._options = options;

    this.token = token;
    this.projectSlug = projectSlug;
  }

  links: API.Links = new API.Links(this);
  projects: API.Projects = new API.Projects(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: `Bearer ${this.token}` };
  }

  static Dub = this;

  static DubError = Errors.DubError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
}

export const {
  DubError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Dub {
  // Helper functions
  export import toFile = Uploads.toFile;
  export import fileFromPath = Uploads.fileFromPath;

  export import RequestOptions = Core.RequestOptions;

  export import Links = API.Links;
  export import LinkListResponse = API.LinkListResponse;
  export import LinkCreateParams = API.LinkCreateParams;
  export import LinkUpdateParams = API.LinkUpdateParams;
  export import LinkListParams = API.LinkListParams;
  export import LinkDeleteParams = API.LinkDeleteParams;

  export import Projects = API.Projects;
  export import Project = API.Project;
  export import ProjectDetails = API.ProjectDetails;
  export import ProjectListResponse = API.ProjectListResponse;
  export import ProjectRetrieveParams = API.ProjectRetrieveParams;

  export import Link = API.Link;
}

export default Dub;
