import { Router } from 'express';
import { getUsers, getUserById, createUser, addFriend, removeFriend, updateUser, deleteUser } from '../../Controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/:userId/friends/:friendId', addFriend);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.delete('/:userId/friends/:friendId',removeFriend);

export default router;




