class UnauthorizedError<T extends object> extends Error {
  statusCode: number;
  data: T | null;

  constructor(message: string, options?: ErrorOptions, data?: T) {
    super(message, options);

    this.name = "UnauthorizedError";

    this.statusCode = 401;
    this.data = data || null;
  }
}

export default UnauthorizedError;
