import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectToDb } from "../../mongo/dbsetup.js";
import { PreConditionFailError } from "../../utils/errors.js";

const dbname = process.env.MONGO_TODO_DB.trim();

const deleteToDoTask = async (req) => {
  const db = await connectToDb(dbname);
  const todoCollection = db.collection("todotasks");


  let { taskId } = req.body;

  try {
    const result = await todoCollection.deleteOne({ _id: ObjectId(taskId) });
    return { message: `Task Deleted Successfully.`, result};
  } catch (error) {
    throw error;
  }
};

export default deleteToDoTask;
