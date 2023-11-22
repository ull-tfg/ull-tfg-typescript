export interface UnexpectedError {
  kind: "UnexpectedError";
  message: Error;
}

export interface Unauthorized {
  kind: "Unauthorized";
}

export interface NotFound {
  kind: "NotFound";
}

export interface ApiError {
  kind: "ApiError";
  status: number;
  error: string;
  path: string;
  message: string;
  timestamp: string;
  details?: Details[];
}

export interface Details {
  kind: "details";
  message: string;
  rejectedValue: string;
  field: string;
}

export type DataError = UnexpectedError | Unauthorized | NotFound | ApiError;
