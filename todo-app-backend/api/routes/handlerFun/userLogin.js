import { connectToDb } from "../../mongo/dbsetup.js";
import bcrypt from "bcrypt";
import {
  AuthorizationError,
} from "../../utils/errors.js";
import jwt from "jsonwebtoken";

const dbname = process.env.MONGO_TODO_USER_DB.trim();

const userLogin = async (req,res) => {
  const db = await connectToDb(dbname);
  const userCollection = db.collection("users");

  let { username, password } = req.body;

  try {
    const user = await userCollection.findOne({ username });

    if (!user) {
      throw new AuthorizationError("Username or Password does not match.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      throw new AuthorizationError("Username or Password does not match.");

    const token = jwt.sign(
      {
        fullname: user.fullname,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.cookie("uatc",token) ;
    //INCOMPLETE - send back cookies 
    return {message:"Successfully Logged In" , uatc:jwt.decode(token)};
  } catch (error) {
    throw error ;
  }
};

export default userLogin;
