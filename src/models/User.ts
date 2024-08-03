import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
   _id: string;
   name: string;
}

const UserSchema = new mongoose.Schema<UserInterface>({
   name: {
      type: String
   }
})
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;