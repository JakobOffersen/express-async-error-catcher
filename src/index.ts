import { RequestHandler, Request, Response, NextFunction } from "express"

// forwards any thrown error to the middleware.
export const asyncErrorCatcher = <
  P,
  ResBody,
  ReqBody,
  ReqQuery,
  Locals extends Record<string, any>>
  (fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>) => (req: Request<P, ResBody, ReqBody, ReqQuery, Locals>, res: Response<ResBody, Locals>, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next)