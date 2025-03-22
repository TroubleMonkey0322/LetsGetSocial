import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Invalid email'] },
    thoughts: [{ type: Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

export const User = model('User', UserSchema);
