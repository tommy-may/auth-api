class NotAcceptableError<T extends object> extends Error {
  statusCode: number;
  data: T | null;

  constructor(message: string, options?: ErrorOptions, data?: T) {
    super(message, options);

    this.name = "NotAcceptableError";

    this.statusCode = 406;
    this.data = data || null;
  }
}

export default NotAcceptableError;
