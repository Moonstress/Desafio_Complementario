import { Router } from 'express';
import UserManagerMongo from '../Dao/userManager.js';

const router = Router();
const userService = new UserManagerMongo();

router.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.send({
      status: 'success',
      payload: users
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    const result = await userService.createUser(newUser);

    res.send({
      status: 'success',
      payload: result
    });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const result = await userService.updateUser(userId, updatedUserData);

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      payload: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await userService.deleteUser(userId);

    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).end(); // No content, indicating successful deletion
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
