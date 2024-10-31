import { NextFunction, Request, Response } from "express";
import { ResponseStatus } from "../constants/constants";

/**
 * Error handler - In case of an unhandled exception in the routes, 
 * this middleware will catch the exception, 
 * log it and response the user with an 500 status code
 * 
 * User information can be found in `res.locals`
 */
export default (ex: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Unhandled exception in ${req.path}`, ex);
    res.status(ResponseStatus.InternalError).json({ description: 'Error occured, Please try again later' });
}