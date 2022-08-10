import { connectToDb } from "../../mongo/dbsetup.js";
import { PreConditionFailError } from "../../utils/errors.js";

const dbname = process.env.MONGO_TODO_DB.trim();

const getToDoTask = async (req) => {
  const db = await connectToDb(dbname);
  const todoCollection = db.collection("todotasks");
  const sectionCollection = db.collection("sections");

  try {
    const user = req.user;
    const sectionObjList = await sectionCollection
      .find({ userId: user.userId })
      .project({ userId: 0 })
      .toArray();
    const sectionIdList = [];

    sectionObjList.map((sectionObj) => {
      sectionIdList.push(sectionObj._id.toString());
    });

    const sectionMap = {};
    sectionObjList.map((section) => {
      sectionMap[section._id.toString()] = { ...section, taskIndexes: [] };
    });

    const todoTaskObjList = await todoCollection
      .find({ sectionId: { $in: sectionIdList } })
      .toArray();
    
      //Sorting task with last added first
      todoTaskObjList.reverse() ;
    
    todoTaskObjList.map((task,index) => {
      sectionMap[task.sectionId]["taskIndexes"].push(index); 
    });

    return { sectionList: sectionMap, todoTaskObjList: todoTaskObjList };
  } catch (error) {
    throw error;
  }
};

export default getToDoTask;
