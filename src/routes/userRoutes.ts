
import express from "express";
import  { createUser } from "../controller/createUser";

const router = express.Router();

router.post('/users', createUser);

export default router;
