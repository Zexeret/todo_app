import { connectToDb } from "../../mongo/dbsetup.js";
import { PreConditionFailError } from "../../utils/errors.js";

const dbname = process.env.MONGO_TODO_DB.trim();

const getDailyTask = async (req) => {
  const db = await connectToDb(dbname);
  const dailytaskCollection = db.collection("dailytasks");

  try {
    const user = req.user;
    
    const dailytasks = await dailytaskCollection
      .find({ userId: user.userId })
      .project({ userId: 0 })
      .toArray();

    return { dailyTasks:dailytasks };
  } catch (error) {
    throw error;
  }
};

export default getDailyTask;
