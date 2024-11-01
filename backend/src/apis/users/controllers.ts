import { Request, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';

import { firebaseAuth } from '../../configs/firebase';
import { ResponseStatus } from '../../constants/constants';

/* 
    This file contains the routes validation implementation
    The convention for route handler is _R at the end of the function name
*/
export const loginUser_R = async (req: Request, res: Response) => {
    console.log('executing loginUser_R()');

    const authorizationCode: string = req.get('authorization');
    if (!authorizationCode) {
        res.status(ResponseStatus.BadRequest).json({ description: 'Authorization code must be provided' });
        return;
    }

    try {
        const decodedToken: DecodedIdToken = await firebaseAuth.verifyIdToken(authorizationCode);

        // TODO: Create user in database

        res.status(ResponseStatus.Ok).json({ description: 'hello', uid: decodedToken.uid, exp: decodedToken.exp, picture: decodedToken.picture });
    } catch (ex) {
        console.error(ex);
        res.status(ResponseStatus.InternalError).json({ description: 'Error occured while login' });
    }
}

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