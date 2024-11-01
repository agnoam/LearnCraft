// This file contains the routes decalration only!

import { Router } from "express";

import { getGeminiChat } from './controllers';

const router: Router = Router();    

router.get('/', getGeminiChat);


export default router;