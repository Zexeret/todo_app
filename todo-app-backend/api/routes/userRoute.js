import express from "express";
import {buildRoute } from "../utils/common.js";
import userSignUp from "./handlerFun/userSignUp.js";
import userLogin from "./handlerFun/userLogin.js";
import verifyUser from "./handlerFun/verifyUser.js";
import userLogOut from "./handlerFun/userLogOut.js";

const userRoute = express.Router();

userRoute.post("/signup", buildRoute(userSignUp));

userRoute.post("/login",buildRoute(userLogin));
userRoute.post("/logout",buildRoute(userLogOut));
userRoute.post("/verify", buildRoute(verifyUser));

export default userRoute;
