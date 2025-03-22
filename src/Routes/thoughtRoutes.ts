import { Router } from 'express';
import { getThoughts, createThought, addReaction } from '../Controllers/thoughtController';

const router = Router();

router.get('/', getThoughts);
router.post('/', createThought);
router.put('/:thoughtId/reactions', addReaction);

export default router;
