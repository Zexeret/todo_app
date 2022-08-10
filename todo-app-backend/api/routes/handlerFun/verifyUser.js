import { connectToDb } from "../../mongo/dbsetup.js";
import bcrypt from "bcrypt";
import { AuthorizationError } from "../../utils/errors.js";
import jwt from "jsonwebtoken";

const dbname = process.env.MONGO_TODO_USER_DB.trim();

const verifyUser = async (req, res) => {
  const db = await connectToDb(dbname);
  const userCollection = db.collection("users");

  const token = req.cookies;
  if(!token || !token.uatc) return "" ;
  
  try {
    const decoded_token = jwt.verify(token.uatc, process.env.JWT_SECRET);
    return decoded_token ;
    
  } catch (error) {
    throw error;
  }
};

export default verifyUser;
