import jwt from "jsonwebtoken";
import { connectToDb } from "../../mongo/dbsetup.js";
import { AuthorizationError } from "../../utils/errors.js";

const dbname = process.env.MONGO_TODO_USER_DB.trim();

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies;
    //console.log("Checking empty token");
    if (!token || !token.uatc)
      throw new AuthorizationError("Login Session Invalid");

    //console.log("Checking token validity");
    const decoded_token = jwt.verify(token.uatc, process.env.JWT_SECRET);

    const db = await connectToDb(dbname);
    const userCollection = db.collection("users");

    const username = decoded_token.username;
    //console.log("Checking user validity username", username);
    const user = await userCollection.findOne({ username });

    //console.log("Checking user validity", user);
    if (!user) {
      throw new AuthorizationError("Username or Password does not match.");
    }

    req.user = { ...decoded_token, userId: user._id.toString() };
    //console.log("Req user set to: ", req.user) ;
    next();
  } catch (error) {
    res.clearCookie("uatc");
    if (error.status) res.status(error.status).send(error.message);
    else res.status(500).send(error);
  }
};

export default userAuthentication;
