import { connectToDb } from "../../mongo/dbsetup.js";
import bcrypt from "bcrypt";
import {
  PreConditionFailError,
  AuthorizationError,
} from "../../utils/errors.js";
import jwt from "jsonwebtoken";

const dbname = process.env.MONGO_TODO_USER_DB.trim();

const userSignUp = async (req, res) => {
  const db = await connectToDb(dbname);
  const userCollection = db.collection("users");
  let { fullname, username, password } = req.body;

  try {
    const user = await userCollection.findOne({ username });

    if (user) {
      throw new PreConditionFailError(
        "Username is already in use. Please choose another one."
      );
    }

    password = await bcrypt.hash(password, 10);

    await userCollection.insertOne({
      fullname,
      username,
      password,
    });

    const token = jwt.sign(
      {
        fullname: fullname,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    // INCOMPLETE - send back cookies
    res.cookie("uatc", token);
    return { message: "Successfully Logged In", uatc: jwt.decode(token) };
  } catch (error) {
    throw error;
  }
};

export default userSignUp ;

// async (req, res) => {
//   const db = await connectToDb(dbname);
//   const userCollection = db.collection("users");
//   let { fullname, username, password } = req.body;

//   try {
//     const user = await userCollection.findOne({ username });

//     if (user) {
//       throw new PreConditionFailError(
//         "Username is already in use. Please choose another one."
//       );
//     }

//     password = await bcrypt.hash(password, 10);

//     const result = await userCollection.insertOne({
//       fullname,
//       username,
//       password,
//     });

//     const { insertedId } = result;

//     const token = jwt.sign(
//       {
//         fullname: fullname,
//         username,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "2d",
//       }
//     );

//     res.status(200).json({ token });

//     // "tokeninfo" : jwt.decode(token)
//     //     "tokeninfo": {
//     //     "id": "62d97831ce098927bb074f48",
//     //     "username": "srat",
//     //     "iat": 1658419250,
//     //     "exp": 1658592050
//     // }
//   } catch (error) {
//     if (error.status) res.status(error.status).send(error.message);
//     else res.status(500).send(error);
//   }
// };
