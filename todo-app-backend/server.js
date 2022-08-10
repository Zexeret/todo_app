import express from "express";
import { getDbConnection } from "./api/mongo/dbsetup.js";
import cors from "cors";
import routes from "./api/routes/index.js";
import cookieParser from "cookie-parser";

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000", "http://127.0.0.1"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

//app config
(async () => {
  const app = express();
  const port = process.env.PORT || 9090;

  //middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsOptions));
  app.use(cookieParser()) ;

  app.use("/api",routes);

  //   await connectToDatabase();
  await getDbConnection();
  app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
  });
})();
