import { connectToDb } from "../../mongo/dbsetup.js";
import { PreConditionFailError } from "../../utils/errors.js";

const dbname = process.env.MONGO_TODO_DB.trim();

const addDailyTask = async (req) => {
  const db = await connectToDb(dbname);
  const dailytaskCollection = db.collection("dailytasks");

  let { taskHeading, taskDesc } = req.body;
  const user= req.user ;
  try {
    if (!taskHeading)
      throw new PreConditionFailError("Task Heading must be entered.");

    
    const userId = user.userId;

    const dailyTaskResult = await dailytaskCollection.insertOne({
      userId,
      taskHeading: taskHeading,
      taskDescription: taskDesc,
      createdDate: new Date().getTime(),
      isTaskCompleted: false,
      completionDate:"",
    });

    return { message: `Daily Task Added Successfully.`};
  } catch (error) {
    throw error;
  }
};

export default addDailyTask;
