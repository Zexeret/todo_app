import express from "express";
import { buildRoute } from "../utils/common.js";
import addDailyTask from "./handlerFun/addDailyTask.js";
import getDailyTask from "./handlerFun/getDailyTask.js";
import updateDailyTask from "./handlerFun/updateDailyTask.js";
import userAuthentication from "./handlerFun/userAuthentication.js";


const dailyTaskRoute = express.Router();

dailyTaskRoute.use(userAuthentication);
dailyTaskRoute.get("/", buildRoute(getDailyTask));
dailyTaskRoute.post("/add", buildRoute(addDailyTask));
dailyTaskRoute.put("/update", buildRoute(updateDailyTask));

export default dailyTaskRoute;
