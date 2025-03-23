"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = exports.Thought = void 0;
const mongoose_1 = require("mongoose");
const ThoughtSchema = new mongoose_1.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, get: (createdAt) => createdAt.toISOString() },
    reactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Reaction' }],
}, { timestamps: true, toJSON: { virtuals: true } });
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
exports.Thought = (0, mongoose_1.model)('Thought', ThoughtSchema);
const ReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
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
    }
});
const Reaction = (0, mongoose_1.model)('Reaction', ReactionSchema);
exports.Reaction = Reaction;
