import { Router } from 'express';
import { getThoughts, createThought, addReaction} from '../../Controllers/thoughtController';
import updateThought from '../../Controllers/thoughtController';
import deleteThought from '../../Controllers/thoughtController';

const router = Router();

router.get('/', getThoughts);
router.post('/', createThought);
router.put('/:thoughtId/reactions', addReaction);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);

export default router;
