const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");

const router = express.Router();

router.get(
  "/:notebookId",
  asyncHandler(async (req, res) => {
    const notes = await Note.findAll({
      where: {
        notebookId: req.params.notebookId,
      },
      order: [["updatedAt", "DESC"]],
    });

    return res.json(notes);
  })
);

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const notes = await Note.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [["updatedAt", "DESC"]],
    });

    return res.json(notes);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const note = await Note.create(req.body);

    return res.json(note);
  })
);

router.delete(
  "/:noteId",
  asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.noteId);
    await note.destroy();
    return res.json(note);
  })
);

router.put(
  "/:noteId",
  asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.noteId);

    const newNote = await note.update(req.body);

    return res.json(newNote);
  })
);

// router.get(
//   "/note/:id",
//   asyncHandler(async (req, res) => {
//     const note = await Note.findByPk(req.params.id);
//     return res.json(note);
//   })
// );

module.exports = router;
