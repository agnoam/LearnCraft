import { Request, Response } from 'express';
import { ResponseStatus } from '../../constants/constants';

/* 
    This file contains the routes validation and business logic for each route
    The convention for route handler is _R at the end of the function name
*/

export const getAllChats_R = (req: Request, res: Response) => {
    res.status(ResponseStatus.NotImplemented).send("Not Implemented Yet");
}

export const createChat_R = (req: Request, res: Response) => {
    res.status(ResponseStatus.NotImplemented).send("Not Implemented Yet");
}

export const addMessage_R = (req: Request, res: Response) => {
    res.status(ResponseStatus.NotImplemented).send("Not Implemented Yet");
}

export const updateMessage_R = (req: Request, res: Response) => {
    res.status(ResponseStatus.NotImplemented).send("Not Implemented Yet");
}
