const userService = require('../services/user.service');

const getLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.getLogin(email, password);
  if (!result) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json({ token: result });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  if (result) {
    return res.status(200).json(result);
  }

  return res.status(404).json({ message: 'User does not exist' });
};

const getAllUsers = async (_req, res) => {
  const allUsers = await userService.getAllUsers();

  res.status(200).json(allUsers);
};

const createUser = async (req, res) => {
  const user = req.body;
  const result = await userService.createUser(user);
  if (result) {
    return res.status(201).json({ token: result });
  }
  return res.status(409).json({ message: 'User already registered' });
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  const result = await userService.deleteUser(id);

  console.log('controller user delete', result);

  return res.status(204).end();
};

module.exports = {
  getLogin,
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
};