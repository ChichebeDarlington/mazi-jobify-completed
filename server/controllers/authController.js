import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("Email already in use");
  }
  const user = await User.create(req.body);
  user.password = undefined;
  const token = await user.createJWT();
  return res
    .status(StatusCodes.CREATED)
    .json({ user, token, location: user.location });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User may not be registered in the system");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(400).json({ msg: "Password incorrrect" });
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !location || !lastName) {
    throw new Error("Please provide all the values!");
  }
  const user = await User.findOne({ _id: req.user._id });
  user.email = email;
  user.name = name;
  user.location = location;
  user.lastName = lastName;
  user.password = undefined;

  await user.save;

  const token = user.createJWT();

  return res.status(201).json({ user, token, location: user.location });
};
