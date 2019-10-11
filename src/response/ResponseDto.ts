export class ResponseDto {
  statusCode: number;
  error: string;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
