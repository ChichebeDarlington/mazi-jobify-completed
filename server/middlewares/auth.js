import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// const auth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return res.status(400).json("Authentication invalid");
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.SECRET);
//     // console.log(payload);
//     req.user = { userId: payload.userId };
//     next();
//   } catch (error) {
//     return res.status(400).json("Error Authentication invalid, this is sad");
//   }
// };

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: "Token authorization is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { userId } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id: userId });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized resquest" });
  }
};

export default auth;
