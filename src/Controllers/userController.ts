import { Request, Response } from 'express';
import { User } from '../Models/user';
import { Types } from 'mongoose';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find(req.body).populate('friends thoughts');
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



export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
     }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};
export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ error: 'Invalid userId or friendId'});
    }
     
    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }


    if (!Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ message: 'User is already friends with this person' });
    }

 
    !Types.ObjectId.isValid(friendId);
    await user.save();


    !Types.ObjectId.isValid(userId);
    await friend.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add friend' });
  }
};


export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;


    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

  
    if (!Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ message: 'User is not friends with this person' });
    }

  
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    await user.save();


    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
    await friend.save();

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove friend' });
  }
};
