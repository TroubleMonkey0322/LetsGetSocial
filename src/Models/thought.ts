import { Schema, model, Types} from 'mongoose';

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now, get: (createdAt: Date) => createdAt.toISOString()},
    reactions: [{type: Schema.Types.ObjectId, ref: 'Reaction'}],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export const Thought = model('Thought', ThoughtSchema);

interface IReaction {
  reactionId: Types.ObjectId;
  username: string;
  reactionBody: string;
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
  },
  reactionBody: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }});

const Reaction = model<IReaction>('Reaction', ReactionSchema);

export { Reaction };





