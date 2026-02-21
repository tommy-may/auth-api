export interface ResBody {
  success: true;
  data: unknown;
}

export interface ErrorResBody {
  success: false;
  name: string;
  message: string;
  err: unknown;
}
