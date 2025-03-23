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
exports.addReaction = exports.createThought = exports.getThoughts = void 0;
const thought_1 = require("../Models/thought");
const user_1 = require("../Models/user");
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
