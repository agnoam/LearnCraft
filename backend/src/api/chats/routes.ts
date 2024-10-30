// This file contains the routes decalration only!

import { Router } from "express";

import { getAllChats_R, createChat_R, addMessage_R, updateMessage_R } from './controllers';

const router: Router = Router();    

router.get('/', getAllChats_R);
router.post('/', createChat_R)
router.post('/message', addMessage_R);
router.put('/message', updateMessage_R);

export default router;