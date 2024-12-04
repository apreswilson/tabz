import mongoose from "mongoose";
import { string } from "zod";

export interface InviteInterface {
   id: mongoose.Schema.Types.ObjectId;
   name: string;
}
interface OrganizationsInterface {
   id: mongoose.Schema.Types.ObjectId;
   name: string;
   joined: Date;
}
export interface UserInterface extends mongoose.Document {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   invites: InviteInterface[];
   organizations: OrganizationsInterface[];
}

const UserSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   invites: [
      {
         id: {
            type: String,
            required: false
         },
         name: {
            type: String,
            required: false
         },
      },
   ],
   organizations: [
      {
         name: {
            type: String,
            required: false
         },
         joined: {
            type: Date,
            required: false,
         },
         role: {
            type: String,
            required: false
         }
      }
   ]
})
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;