export class CommonHttpResponse<T> {
  public statusCode: number;
  public message: string;
  public error: string;
  public data: T;

  constructor(statusCode: number, error: string, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.data = data;
  }
}
