export type RouteData = {
  id: string;
  path?: string;
  title?: string;
  element: any;
  type: "public" | "protected";
};

export type ProgressState = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILED";

export type HttpResponseError = {
  message?: string;
  messages?: string[];
};
