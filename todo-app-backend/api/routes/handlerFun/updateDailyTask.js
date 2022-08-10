import { connectToDb } from "../../mongo/dbsetup.js";
import { PreConditionFailError } from "../../utils/errors.js";
import { ObjectId } from "mongodb";

const dbname = process.env.MONGO_TODO_DB.trim();

const updateDailyTask = async (req) => {
  const db = await connectToDb(dbname);
  const dailytaskCollection = db.collection("dailytasks");

  let { isTaskCompleted, completionDate, taskId, isResetInitiated=false } = req.body;

  try {
    if(isResetInitiated) {
           await dailytaskCollection.updateMany(
            { },
            {
              $set: {
                isTaskCompleted: false,
                completionDate: "",
              },
            }
          );

          return {message: "Daily Task Reset Success."} ;
    }
    const result = await dailytaskCollection.updateOne(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          isTaskCompleted: isTaskCompleted,
          completionDate: completionDate,
        },
      }
    );

    return { message: `Daily Task Updated Successfully.`};
  } catch (error) {
    throw error;
  }
};

export default updateDailyTask;
