import { Router } from 'express';
import { getUsers, createUser, addFriend } from '../Controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:userId/friends/:friendId', addFriend);

export default router;
