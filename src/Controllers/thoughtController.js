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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserThought = exports.deleteThought = exports.addReaction = exports.createThought = exports.getThoughts = void 0;
const thought_1 = require("../Models/thought");
const user_1 = require("../Models/user");
//import { Router } from 'express';
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const getThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield thought_1.Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getThoughts = getThoughts;
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thought_1.Thought.create(req.body);
        yield user_1.User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.createThought = createThought;
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.addReaction = addReaction;
router.delete('/api/thoughts/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    try {
        const deletedThought = yield thought_1.Thought.findByIdAndDelete(thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json({ message: 'Thought deleted successfully', deletedThought });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting thought', error });
    }
}));
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedThought = yield user_1.User.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).json({ error: 'Your thought was not found' });
        }
        res.json({ message: 'Your thought was deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete your thought' });
    }
});
exports.deleteThought = deleteThought;
const updateUserThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield user_1.User.findByIdAndUpdate(req.params.id);
        if (!updatedThought) {
            return res.status(404).json({ error: 'Your thought was not found' });
        }
        res.json({ message: 'Your thought was updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update your thought' });
    }
});
exports.updateUserThought = updateUserThought;
exports.default = router;
