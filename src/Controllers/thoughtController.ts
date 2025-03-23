import { Request, Response } from 'express';
import { Thought } from '../Models/thought';
import { User } from '../Models/user';
//import { Router } from 'express';
import express from 'express';

const router = express.Router();

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};




router.delete('/api/thoughts/:thoughtId', async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  try {

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

 
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }


    return res.status(200).json({ message: 'Thought deleted successfully', deletedThought });
  } catch (error) {
    
    return res.status(500).json({ message: 'Error deleting thought', error });
  }
});

export default router;
