import express from "express";
import { buildRoute } from "../utils/common.js";
import addToDoTask from "./handlerFun/addToDoTask.js";
import deleteToDoTask from "./handlerFun/deleteToDoTask.js";
import getToDoTask from "./handlerFun/getToDoTask.js";
import updateToDoTask from "./handlerFun/updateToDoTask.js";
import userAuthentication from "./handlerFun/userAuthentication.js";


const todoRoute = express.Router();

todoRoute.use(userAuthentication) ;
todoRoute.get("/", buildRoute(getToDoTask));
todoRoute.post("/add", buildRoute(addToDoTask));
todoRoute.put("/update", buildRoute(updateToDoTask));
todoRoute.put("/delete", buildRoute(deleteToDoTask));


export default todoRoute;
