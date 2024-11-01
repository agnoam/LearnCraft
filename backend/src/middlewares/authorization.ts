import { NextFunction, Request, Response } from "express";
import { DecodedIdToken, FirebaseAuthError } from "firebase-admin/auth";

import { ResponseStatus } from "../constants/constants";
import { firebaseAuth } from "../configs/firebase";

/**
 * Authorization middleware - Checking for user authentication/authorization
 * 
 * User information can be found in `res.locals.user`
 */
export default async (req: Request, res: Response, next: NextFunction) => {
    const authorizationCode: string = req.get('authorization');
    if (!authorizationCode) {
        res.status(ResponseStatus.BadRequest).json({ description: 'Authorization code must be provided' });
        return;
    }

    try {
        const decodedToken: DecodedIdToken = await firebaseAuth.verifyIdToken(authorizationCode);
        res.locals.user = decodedToken;
        next();
    } catch (ex) {
        if (ex instanceof FirebaseAuthError)
            res.status(ResponseStatus.Unauthorized).json({ description: 'Invalid authorization code' });
    }
}