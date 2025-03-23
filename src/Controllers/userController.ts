import { Request, Response } from 'express';
import { User } from '../Models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('friends thoughts');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
