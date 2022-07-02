const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook } = require("../../db/models");

const router = express.Router();

// router.get("/user", asyncHandler(async (req, res) => {
//   const user = User.findAll();
//   res.json(user);
// }))

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const notebooks = await Notebook.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [["updatedAt", "DESC"]],
    });
    return res.json(notebooks);
  })
);

// router.get(
//   "/:notebookId/notes",
//   asyncHandler(async (req, res) => {
//     const notebookId = req.params.notebookId;
//     // const userId = req.params.userId;

//     const notes = await Note.findAll({
//       where: {
//         notebookId: notebookId,
//       },
//       order: [["updatedAt", "DESC"]],
//     });
//     return res.json(notes);
//   })
// );

// router.get(
//   "/notebook/:notebookId",
//   asyncHandler(async (req, res) => {
//     const notebookId = req.params.notebookId;

//     const notebook = await Notebook.findByPk(notebookId);

//     return res.json(notebook);
//   })
// );

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newNotebook = await Notebook.create(req.body);
    return res.json(newNotebook);
  })
);

router.delete(
  "/:notebookId",
  asyncHandler(async (req, res) => {
    const notebook = await Notebook.findByPk(req.params.notebookId);

    await notebook.destroy();

    return res.json(notebook);
  })
);

router.put(
  "/:notebookId",
  asyncHandler(async (req, res) => {
    const notebook = await Notebook.findByPk(req.params.notebookId);

    const newNotebook = await notebook.update(req.body);

    return res.json(newNotebook);
  })
);

module.exports = router;
