import mongoose, { InferSchemaType } from 'mongoose';

export interface UserProfileType {
  username: string;
}

export interface UserType {
  profile: UserProfileType;
  lastLogin: Date;
}

const profileSchema = new mongoose.Schema<UserProfileType>(
  {
    username: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema<UserType>(
  {
    profile: {
      type: profileSchema
    },
    lastLogin: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

const Person =
  mongoose.models.Person ||
  mongoose.model<InferSchemaType<typeof userSchema>>('Person', userSchema);
export default Person;
