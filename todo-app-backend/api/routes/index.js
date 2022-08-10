import express from "express";
import dailyTaskRoute from "./dailyTaskRoute.js";
import todoRoute from "./todoRoute.js";
import userRoute from "./userRoute.js";



const routes = express.Router();



routes.get("/", (req, res) => {
  res.status(200).send("To Do BE Running Successfully!");
});

routes.use("/user",userRoute) ;
routes.use("/todotask", todoRoute ) ;
routes.use("/dailytask",dailyTaskRoute) ;


export default routes;
