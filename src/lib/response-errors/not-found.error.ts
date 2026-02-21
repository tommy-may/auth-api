type DataType<T> = T & { url: string };

class NotFoundError<T extends object> extends Error {
  statusCode: number;
  data: DataType<T>;

  constructor(message: string, url: string, options?: ErrorOptions, data?: T) {
    super(message, options);

    this.name = "NotFoundError";

    this.statusCode = 404;
    this.data = { url, ...data } as DataType<T>;
  }
}

export default NotFoundError;
