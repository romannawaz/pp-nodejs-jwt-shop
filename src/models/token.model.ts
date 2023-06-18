import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    refreshToken: { type: String, require: true },
  },
  { timestamps: true },
);

const UserToken = mongoose.model('UserToken', userTokenSchema);

export default UserToken;
