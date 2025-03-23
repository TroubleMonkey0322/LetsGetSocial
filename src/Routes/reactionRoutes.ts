import { Request, Response } from 'express';
import { Thought } from '../Models/thought';
import { Reaction } from '../Models/thought'; 


export const addReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params; 
    const { username, reactionBody } = req.body; 


    const newReaction = new Reaction({
      username,
      reactionBody,
    });

 
    await newReaction.save();

    
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: newReaction._id } }, 
      { new: true }
    ).populate('reactions'); 

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
