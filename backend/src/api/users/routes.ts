// This file contains the routes decalration only!

import { Router } from "express";

import { loginUser_R, getUser_R, createUser_R, deleteUser_R, updateUser_R } from "./controllers";

console.log('Initializing users router');
const router: Router = Router();    

router.post('/login', loginUser_R);
router.get('/:userID', getUser_R);
router.post('/', createUser_R);
router.put('/:userID', updateUser_R);
router.delete('/:userID', deleteUser_R);

export default router;