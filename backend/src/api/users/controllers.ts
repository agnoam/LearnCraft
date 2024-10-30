import { Request, Response } from 'express';

/* 
    This file contains the routes validation implementation
    The convention for route handler is _R at the end of the function name
*/

export const getUser_R = (req: Request, res: Response) => {
    res.send(`Fetching ${req.params.userID}`);
}

export const createUser_R = (req: Request, res: Response) => {
    res.send("Creating new user");
}

export const updateUser_R = (req: Request, res: Response) => {
    res.send(`Updating ${req.params.userID}`);
}

export const deleteUser_R = (req: Request, res: Response) => {
    res.send(`Deleting ${req.params.userID}`);
}