import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
      unique: true,
    },
    password: {
      require: true,
      type: String,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
