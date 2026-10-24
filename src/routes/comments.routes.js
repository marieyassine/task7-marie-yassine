const express = require("express")
const router = express.Router()

const commentsController = require("../controllers/comments.controller")

router.get("/", commentsController.getComments)
router.post("/", commentsController.createComment)

router.get("/:id", commentsController.getCommentById)
router.patch("/:id", commentsController.updateComment)
router.delete("/:id", commentsController.deleteComment)

module.exports = router