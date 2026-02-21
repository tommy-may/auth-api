class BadRequestError<T extends object> extends Error {
  statusCode: number;
  data: T | null;

  constructor(message: string, options?: ErrorOptions, data?: T) {
    super(message, options);

    this.name = "BadRequestError";

    this.statusCode = 400;
    this.data = data || null;
  }
}

export default BadRequestError;
