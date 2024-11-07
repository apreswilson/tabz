import mongoose from "mongoose";

const OrgnizationSchema = new mongoose.Schema({
   organizationName: {
      type: String,
      required: true
   },
   dateCreated: {
      type: Date,
      required: true
   }
})

const Organization = mongoose.models.Organization || mongoose.model('Organization', OrgnizationSchema);

export default Organization;