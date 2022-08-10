import jwt from "jsonwebtoken";
import { connectToDb } from "../../mongo/dbsetup.js";
import { PreConditionFailError } from "../../utils/errors.js";

const dbname = process.env.MONGO_TODO_DB.trim();

const addToDoTask = async (req) => {
  const db = await connectToDb(dbname);
  const todoCollection = db.collection("todotasks");
  const sectionCollection = db.collection("sections");

  let { taskHeading, taskDesc, section, isNewSectionCreated } = req.body;
  let sectionId = section;
  const user = req.user;

  try {
    if (!taskHeading)
      throw new PreConditionFailError("Task Heading must be entered.");
    if (!section)
      throw new PreConditionFailError("Task must be added under a Section.");

    if (isNewSectionCreated) {
      const userId = user.userId;
      const lastUpdatedDate = new Date().getTime();

      const preSection = await sectionCollection.findOne({
        userId:userId,
        sectionName: section,
      });
      if (preSection)
        throw new PreConditionFailError(
          "Section Name already exist. Enter a new name."
        );

      const result = await sectionCollection.insertOne({
        userId,
        sectionName: section,
        lastUpdatedDate,
      });

      const { insertedId } = result;
      sectionId = insertedId.toString();
    }

    const taskResult = await todoCollection.insertOne({
      sectionId: sectionId,
      taskHeading: taskHeading,
      taskDescription: taskDesc,
      createdDate: new Date().getTime(),
      isTaskCompleted: false,
      completionDate: "",
    });

    return { message: `Task Added Successfully.` };
  } catch (error) {
    throw error;
  }
};

export default addToDoTask;
