import { Request, Response } from "express";

export class BaseRoute {
  constructor (
  ) {
  }

  public render(req: Request, res: Response, content?: string) {
    res.type('text/html');
    res.status(200);
    res.send(content);
  }
}
