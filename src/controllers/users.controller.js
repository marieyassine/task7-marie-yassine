const users = require("../models/users");
const posts = require("../models/posts");

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const user = {
    id: Math.floor(Math.random() * 1000),
    ...req.body,
    createdAt: new Date()};
  users.push(user);
  res.status(201).json(user);};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  for (const key in req.body) {
    user[key] = req.body[key];
  }

  res.status(200).json(user);};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });}
  const newUsers = users.filter((user) => user.id !== id);

  users.length = 0;
  users.push(...newUsers);

  res.status(204).send();};

const getUserPosts = (req, res) => {
  const id = parseInt(req.params.id);
  
  const userPosts = posts.filter((post) => post.userId === id);

  res.status(200).json(userPosts);};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts
};