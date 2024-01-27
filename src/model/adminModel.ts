import mongoose, { Schema } from "mongoose";

interface IAdmin {
    name: string;
    email: string;
    password: string;
  }

  const newAdmin = new Schema<IAdmin>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const Admin = mongoose.model("Admin", newAdmin);

  export default Admin;