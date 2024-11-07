import mongoose from "mongoose";
import { JWTPayload } from "jose";

interface InviteInterface {
   id: mongoose.Schema.Types.ObjectId;
   name: string;
}

export interface OrganizationsInterface {
   id: mongoose.Schema.Types.ObjectId;
   name: string;
   joined: string;
}

export interface UserInterface extends JWTPayload {
   userId: mongoose.Schema.Types.ObjectId;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   invites: InviteInterface[];
   organizations: OrganizationsInterface[];
}

export interface sessionInviteInterface {
   id: string;
   name: string;
}

export interface sessionOrganizationInterface {
   id: string;
   name: string;
   joined: Date;
}

export interface SessionInterface {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   invites: sessionInviteInterface[];
   organizations: sessionOrganizationInterface[];
   expiresAt: Date;
}