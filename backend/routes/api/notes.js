const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");


const router = express.Router();
// route = api/notes/


//Get all notes of a specific user READ
router.get("/:userId", asyncHandler(async(req, res) => {

  const userId = req.params.userId;
  const notes = await Note.findAll({
    where: {
      userId: userId
    },
    order: [["updatedAt", "DESC"]],
  })
  
  return res.json(notes)
}))

// [
//   {
//   "id": 1,
//   "userId": 1,
//   "notebookId": 1,
//   "title": "My First Note",
//   "content": "Hello",
//   "createdAt": "2021-11-15T23:44:11.994Z",
//   "updatedAt": "2021-11-15T23:44:11.994Z"
//   },
//   {
//   "id": 2,
//   "userId": 1,
//   "notebookId": 1,
//   "title": "My Second Note",
//   "content": "Hello",
//   "createdAt": "2021-11-15T23:44:11.994Z",
//   "updatedAt": "2021-11-15T23:44:11.994Z"
//   }
//  ]
// ----------------------------------------------------------


//Get a specific note READ WORKS
router.get("/note/:id", asyncHandler(async (req, res) => {
		const note = await Note.findByPk(req.params.id);
		return res.json(note);
	})
);

// {
//   "id": 1,
//   "userId": 1,
//   "notebookId": 1,
//   "title": "My First Note",
//   "content": "Hello",
//   "createdAt": "2021-11-15T23:44:11.994Z",
//   "updatedAt": "2021-11-15T23:44:11.994Z"
//   }



//Delete a specific note DESTROY WORKS
router.delete("/note/:id", asyncHandler(async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  await note.destroy();
  return res.json(note);

  })
);



//Post a new note CREATE WORKS
router.post("/", asyncHandler(async(req, res) => {
  const { userId, notebookId, title, content } = req.body;

  const newNote = await Note.create({
    userId: userId,
    notebookId: notebookId,
    title: title,
    content: content
  })

  const notes = await Note.findAll({
    where: {
      userId: userId,
      notebookId: notebookId,
    },
    order: [["updatedAt", "DESC"]],
  })
  return res.json(notes)

}))



//Edit a specific note UPDATE WORKS
router.put("/note/:id", asyncHandler(async(req, res) => {
  const noteId = req.params.id;

  const note = await Note.findByPk(noteId);
  const { notebookId, title, content } = req.body;

  const newNote = await note.update({
    notebookId: notebookId,
    title: title,
    content: content
  })
  return res.json(newNote)
}))



module.exports = router;
