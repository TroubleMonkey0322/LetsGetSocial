import { Router } from 'express';
import { getThoughts, createThought, addReaction ,updateThought, deleteThought } from '../../Controllers/thoughtController';

const router = Router();

router.get('/', getThoughts);
router.post('/', createThought);
router.put('/:thoughtId/reactions', addReaction);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);

export default router;
