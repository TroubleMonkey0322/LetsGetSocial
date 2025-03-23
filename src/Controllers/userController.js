"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.addFriend = exports.updateUser = exports.deleteUser = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const user_1 = require("../Models/user");
const mongoose_1 = require("mongoose");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find(req.body).populate('friends thoughts');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_1.User.findByIdAndUpdate(req.params.id);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
exports.updateUser = updateUser;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, friendId } = req.params;
        const user = yield user_1.User.findById(userId);
        const friend = yield user_1.User.findById(friendId);
        if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ error: 'Invalid userId or friendId' });
        }
        if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }
        if (!mongoose_1.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'User is already friends with this person' });
        }
        !mongoose_1.Types.ObjectId.isValid(friendId);
        yield user.save();
        !mongoose_1.Types.ObjectId.isValid(userId);
        yield friend.save();
        res.status(200).json({ message: 'Friend added successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to add friend' });
    }
});
exports.addFriend = addFriend;
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, friendId } = req.params;
        const user = yield user_1.User.findById(userId);
        const friend = yield user_1.User.findById(friendId);
        if (!user || !friend) {
            return res.status(404).json({ error: 'User or friend not found' });
        }
        if (!mongoose_1.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'User is not friends with this person' });
        }
        user.friends = user.friends.filter((id) => id.toString() !== friendId);
        yield user.save();
        friend.friends = friend.friends.filter((id) => id.toString() !== userId);
        yield friend.save();
        res.status(200).json({ message: 'Friend removed successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to remove friend' });
    }
});
exports.removeFriend = removeFriend;
