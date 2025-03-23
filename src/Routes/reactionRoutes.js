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
exports.addReaction = void 0;
const thought_1 = require("../Models/thought");
const thought_2 = require("../Models/thought");
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { thoughtId } = req.params;
        const { username, reactionBody } = req.body;
        const newReaction = new thought_2.Reaction({
            username,
            reactionBody,
        });
        yield newReaction.save();
        const updatedThought = yield thought_1.Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: newReaction._id } }, { new: true }).populate('reactions');
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addReaction = addReaction;
