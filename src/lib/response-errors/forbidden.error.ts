class ForbiddenError<T extends object> extends Error {
  statusCode: number;
  data: T | null;

  constructor(message: string, options?: ErrorOptions, data?: T) {
    super(message, options);

    this.name = "ForbiddenError";

    this.statusCode = 403;
    this.data = data || null;
  }
}

export default ForbiddenError;
