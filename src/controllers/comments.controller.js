const comments = require("../models/comments")

const getComments = (req,res) => {

  if(req.query.postId){
    const id = parseInt(req.query.postId)
    const result = comments.filter((comment) => comment.postId === id)

    return res.status(200).json(result)}

  res.status(200).json(comments)}

const getCommentById = (req,res) => {

  const id = parseInt(req.params.id)
  const comment = comments.find((comment) => comment.id === id)

  if(!comment){
    return res.status(404).json({message:"Comment not found"})}

  res.status(200).json(comment)}


const createComment = (req,res) => {

  const comment = {
    id: Math.floor(Math.random() * 1000),
    ...req.body,
    createdAt: new Date()}

  comments.push(comment)

  res.status(201).json(comment)}

const updateComment = (req,res) => {
  const id = parseInt(req.params.id)
  const comment = comments.find((comment) => comment.id === id)

  if(!comment){
    return res.status(404).json({message:"Comment not found"})}

  for(const key in req.body){
    comment[key] = req.body[key]}
  
  res.status(200).json(comment)}


const deleteComment = (req,res) => {

  const id = parseInt(req.params.id)
  const comment = comments.find((comment) => comment.id === id)

  if(!comment){
    return res.status(404).json({message:"Comment not found"})}

  const result = comments.filter((comment) => comment.id !== id)

  comments.length = 0
  comments.push(...result)

  res.status(204).send()}

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment}