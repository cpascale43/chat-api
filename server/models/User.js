import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// 2 types of users programmatically ensures API and DB validation
export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

// create a schema for a single document inside user collection
  // uuidv4 generates a random string by default
  // timestamps: true adds a createdAt and updatedAt date value
  // collection shows what collection name is inside database
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// add a static methd to userSchema that takes 3 parameters: firstName, lastName, type
// `this` keyword ensures we perform operations on the userSchema object
userSchema.statics.createUser = async function (firstName, lastName, type) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("User", userSchema);
