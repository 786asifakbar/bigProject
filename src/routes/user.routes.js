import { Router } from "express";
import { registerUser } from "../controllers/user.controllers";

const router = express.Router();

router.route('/register').post(registerUser);



export  {router};