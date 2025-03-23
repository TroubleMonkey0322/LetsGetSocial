"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../Controllers/thoughtController");
const router = (0, express_1.Router)();
router.get('/', thoughtController_1.getThoughts);
router.post('/', thoughtController_1.createThought);
router.put('/:thoughtId/reactions', thoughtController_1.addReaction);
exports.default = router;
