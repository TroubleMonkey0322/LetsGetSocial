"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, 'Invalid email'] },
    thoughts: [{ type: mongoose_1.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }]
}, { timestamps: true, toJSON: { virtuals: true } });
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
