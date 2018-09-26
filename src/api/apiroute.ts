import { Response } from "express";

export interface ApiResponse
{
  error;
  code;
  message;
  results;
}

export class BaseApiRoute
{

  constructor() {
  }

  public response(res: Response, data: any, statusCode: number = 200, message: string = ''): void
  {
    const error = (statusCode >= 400) ? true : false

    const response: ApiResponse = {
      error: error,
      code: statusCode,
      message: message,
      results: data,
    };

    res.statusCode = statusCode;
    res.statusMessage = message;
    res.json(response);
  }
}
