import { connectToDb } from "../../mongo/dbsetup.js";
import bcrypt from "bcrypt";
import { AuthorizationError } from "../../utils/errors.js";
import jwt from "jsonwebtoken";

const dbname = process.env.MONGO_TODO_USER_DB.trim();

const userLogOut = async (req, res) => {
  try {
    
    res.clearCookie("uatc");
    return { message: "Successfully Logged Out" };
  } catch (error) {
    throw error;
  }
};

export default userLogOut;
