"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers);
router.post('/', userController_1.createUser);
router.put('/:userId/friends/:friendId', userController_1.addFriend);
exports.default = router;
