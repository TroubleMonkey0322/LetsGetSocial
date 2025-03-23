"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../../Controllers/thoughtController");
const thoughtController_2 = __importDefault(require("../../Controllers/thoughtController"));
const thoughtController_3 = __importDefault(require("../../Controllers/thoughtController"));
const router = (0, express_1.Router)();
router.get('/', thoughtController_1.getThoughts);
router.post('/', thoughtController_1.createThought);
router.put('/:thoughtId/reactions', thoughtController_1.addReaction);
router.put('/thoughts/:id', thoughtController_2.default);
router.delete('/thoughts/:id', thoughtController_3.default);
exports.default = router;
