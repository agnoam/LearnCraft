// This file contains the routes decalration only!

import { Router } from "express";

import { getUser_R, createUser_R, deleteUser_R, updateUser_R } from "./controllers";

const router: Router = Router();    

router.get('/:userID', getUser_R);
router.post('/', createUser_R);
router.put('/:userID', updateUser_R);
router.delete('/:userID', deleteUser_R);

export default router;