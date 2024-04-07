import { Request, Response } from "express";

export interface Controller {
   getAll(req: Request, res: Response): Promise<void | Response<any>>;
}