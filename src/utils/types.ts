export type RouteData = {
  id: string;
  path?: string;
  title?: string;
  element: any;
  type: "public" | "protected";
};

export type ProgressState = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
