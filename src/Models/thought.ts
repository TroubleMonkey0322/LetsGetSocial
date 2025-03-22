import { Schema, model, Types } from 'mongoose';

const ReactionSchema = new Schema(
  {
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    reactions: [ReactionSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export const Thought = model('Thought', ThoughtSchema);
