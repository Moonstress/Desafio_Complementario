import { Router } from 'express';
import { userModel } from '../Dao/models/user.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    let users = await userModel.find();
    res.send({
      status: 'success',
      payload: users,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {
    let newUser = req.body;
      
    const result = await userModel.create(newUser); // Use newUser object

    res.send({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
});


router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    const result = await userModel.findByIdAndUpdate(userId, updatedUserData, {
      new: true, // Return the updated document
    });

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await userModel.findByIdAndRemove(userId);

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).end(); // No content, indicating successful deletion
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router
