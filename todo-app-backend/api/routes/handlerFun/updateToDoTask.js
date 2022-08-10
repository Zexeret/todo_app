import { connectToDb } from "../../mongo/dbsetup.js";
import { ObjectId } from "mongodb";

const dbname = process.env.MONGO_TODO_DB.trim();

const updateToDoTask = async (req) => {
  const db = await connectToDb(dbname);
  const todoCollection = db.collection("todotasks");

  let { isTaskCompleted, completionDate, taskId } = req.body;

  try {
    const result = await todoCollection.updateOne(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          isTaskCompleted: isTaskCompleted,
          completionDate: completionDate,
        },
      }
    );

    return { message: `Task Updated Successfully.` };
  } catch (error) {
    throw error;
  }
};

export default updateToDoTask;
