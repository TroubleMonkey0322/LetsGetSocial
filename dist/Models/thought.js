"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thought = void 0;
const mongoose_1 = require("mongoose");
const ReactionSchema = new mongoose_1.Schema({
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
}, { timestamps: true });
const ThoughtSchema = new mongoose_1.Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    reactions: [ReactionSchema]
}, { timestamps: true, toJSON: { virtuals: true } });
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
exports.Thought = (0, mongoose_1.model)('Thought', ThoughtSchema);
