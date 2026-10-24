const posts = require("../models/posts")
const comments = require("../models/comments")

const getPosts = (req,res) => {

  if(req.query.tag){
    const result = posts.filter((post) => post.tags.includes(req.query.tag))
    return res.status(200).json(result)}

  res.status(200).json(posts)}


const getPostById = (req,res) => {
  const id = parseInt(req.params.id)

  const post = posts.find((post) => post.id === id)

  if(!post){
    return res.status(404).json({message:"Post not found"})}

  res.status(200).json(post)}


const createPost = (req,res) => {

  const newPost = {
    id: Math.floor(Math.random() * 1000),
    ...req.body,
    likes: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  posts.push(newPost)

  res.status(201).json(newPost)
}


const updatePost = (req,res) => {
  const id = parseInt(req.params.id)

  const post = posts.find((post) => post.id === id)

  if(!post){
    return res.status(404).json({message:"Post not found"})}

  for(const key in req.body){
    post[key] = req.body[key]}

  post.updatedAt = new Date()

  res.status(200).json(post)}


const deletePost = (req,res) => {
  const id = parseInt(req.params.id)

  const post = posts.find((post) => post.id === id)

  if(!post){
    return res.status(404).json({message:"Post not found"})}

  const result = posts.filter((post) => post.id !== id)

  posts.length = 0
  posts.push(...result)

  res.status(204).send()}

const likePost = (req,res) => {
  const id = parseInt(req.params.id)

  const post = posts.find((post) => post.id === id)

  if(!post){
    return res.status(404).json({message:"Post not found"}) }

  post.likes++
  res.status(200).json(post)
}


const getPostComments = (req,res) => {
  const id = parseInt(req.params.id)
  const result = comments.filter((comment) => comment.postId === id)
  res.status(200).json(result)
}


module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostComments}