const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.updateAdmin = async (adminData) => {
  var oldAdmin = Admin.find(adminData._id);
  return await Admin.findByIdAndUpdate(
    adminData._id,
    {
      firstName: adminData.firstName ? adminData.firstName : oldAdmin.firstName,
      lastName: adminData.lastName ? adminData.lastName : oldAdmin.lastName,
      email: adminData.email ? adminData.email : oldAdmin.email,
      password: adminData.password ? adminData.password : oldAdmin.password,
    },
    { new: true }
  );
};

adminSchema.methods.loginAdmin = async (loginDetails) => {
  const admin = await Admin.findOne({ email: loginDetails.email });
  try {
    const match = await bcrypt.compare(loginDetails.password, admin.password);
    const accessToken = jwt.sign(
      JSON.stringify({email: admin.email, password: admin.password}),
      process.env.ADMIN_TOKEN_SECRET
    );
    if (match) {
     return { accessToken: accessToken, firstName: admin.firstName, lastName: admin.lastName };
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

adminSchema.methods.createAdmin = async (requestBody) => {
  const hashedPassword = await bcrypt.hash(requestBody.password, 10);
  const newAdmin = new Admin({
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    email: requestBody.email,
    password: hashedPassword,
  });
  return await Admin.create(newAdmin);
};

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
