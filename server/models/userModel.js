import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 20,
      minlength: 4,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "please provide a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },

    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
      default: "last-name",
    },
    location: {
      type: String,
      maxlength: 20,
      trim: true,
      default: "my-city",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.SECRET, {
    expiresIn: "20d",
  });
};

userSchema.methods.comparePassword = async function (password) {
  const comparePassword = await bcryptjs.compare(password, this.password);
  return comparePassword;
};

export default mongoose.model("User", userSchema);
