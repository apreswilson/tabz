import mongoose from "mongoose";

const OrgnizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  shouts: [
    {
      author: {
        type: String,
        required: true,
      },
      authorRole: {
        type: String,
        required: true,
      },
      timePosted: {
        type: String,
        required: true,
      },
      relevantRoles: {
        type: [String],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  members: [
    {
      memberName: {
        type: String,
        required: true,
      },
      memberEmail: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
  tasks: [
    {
      taskName: {
        type: String,
        required: true,
      },
      roles: {
        type: String,
        required: true,
      },
      priority: {
        type: String,
        required: true,
      },
      deadline: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
  events: [
    {
      eventName: {
        type: String,
        required: true,
      },
      eventDate: {
        type: String,
        required: true,
      },
      eventTime: {
        type: String,
        required: true,
      },
      relevantRoles: {
        type: Array,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  roles: [
    {
      roleName: {
        type: String,
        require: true,
      },
      permissions: {
        shout: {
          type: Boolean,
          required: true,
        },
        calendar: {
          type: Boolean,
          required: true,
        },
        member: {
          type: Boolean,
          required: true,
        },
        invite: {
          type: Boolean,
          required: true,
        },
        task: {
          type: Boolean,
          required: true,
        },
        admin: {
          type: Boolean,
          required: true,
        },
      },
    },
  ],
});

const Organization = mongoose.models.Organization || mongoose.model("Organization", OrgnizationSchema);

export default Organization;
