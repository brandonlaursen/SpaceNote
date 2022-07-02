const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook, Note, User } = require("../../db/models");

const router = express.Router();
// route = api/notebooks/

router.get("/user", asyncHandler(async (req, res) => {
  const user = User.findAll();
  res.json(user);

}))

//Get all notebooks of a specific user READ WORKS
router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const notebooks = await Notebook.findAll({
      where: {
        userId: userId,
      },
      order: [["updatedAt", "DESC"]],
    });
    return res.json(notebooks);
  })
);

// [
//   {
//       "id": 1,
//       "title": "First",
//       "userId": 1,
//       "bannerPicUrl": "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
//       "createdAt": "2021-11-15T23:44:11.970Z",
//       "updatedAt": "2021-11-15T23:44:11.970Z"
//   },
//   {
//       "id": 2,
//       "title": "Second",
//       "userId": 1,
//       "bannerPicUrl": "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
//       "createdAt": "2021-11-15T23:44:11.970Z",
//       "updatedAt": "2021-11-15T23:44:11.970Z"
//   }
// ]

//Get all notes of a specific notebook READ WORKS
router.get(
  "/:notebookId/notes",
  asyncHandler(async (req, res) => {
    const notebookId = req.params.notebookId;
    // const userId = req.params.userId;

    const notes = await Note.findAll({
      where: {
        notebookId: notebookId,
      },
      order: [["updatedAt", "DESC"]],
    });
    return res.json(notes);
  })
);

//Returns an array of note objects
// [
//   {
//       "id": 1,
//       "userId": 1,
//       "notebookId": 1,
//       "title": "My First Note",
//       "content": "Hello",
//       "createdAt": "2021-11-16T02:21:36.901Z",
//       "updatedAt": "2021-11-16T02:21:36.901Z"
//   },
//   {
//       "id": 2,
//       "userId": 1,
//       "notebookId": 1,
//       "title": "My Second Note",
//       "content": "Hello",
//       "createdAt": "2021-11-16T02:21:36.901Z",
//       "updatedAt": "2021-11-16T02:21:36.901Z"
//   },
//   {
//       "id": 3,
//       "userId": 1,
//       "notebookId": 1,
//       "title": "My Third Note",
//       "content": "Hello",
//       "createdAt": "2021-11-16T02:21:36.901Z",
//       "updatedAt": "2021-11-16T02:21:36.901Z"
//   }
// ]

//Get a specific notebook READ WORKS
router.get(
  "/notebook/:notebookId",
  asyncHandler(async (req, res) => {
    const notebookId = req.params.notebookId;

    const notebook = await Notebook.findByPk(notebookId);

    return res.json(notebook);
  })
);

// {
//   "id": 4,
//   "title": "First",
//   "userId": 2,
//   "bannerPicUrl": "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
//   "createdAt": "2021-11-16T02:21:36.833Z",
//   "updatedAt": "2021-11-16T02:21:36.833Z"
// }

// Create a notebook CREATE WORKS
router.post(
  "/",
  asyncHandler(async function (req, res) {
    const { title, userId } = req.body;
    const newNotebook = await Notebook.create({
      title: title,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.json(newNotebook);
  })
);

//Delete a specfiic notebook DELETE WORKS
router.delete(
  "/notebook/:notebookId",
  asyncHandler(async (req, res) => {
    const notebookId = req.params.notebookId;

    const notebook = await Notebook.findByPk(notebookId);
    const userId = notebook.userId;
    await notebook.destroy();

    const notebooks = await Notebook.findAll({
      where: {
        userId: userId,
      },
    });
    return res.json(notebooks);
  })
);

//Edit a specific notebook UPDATE WORKS
router.put(
  "/notebook/:notebookId",
  asyncHandler(async (req, res) => {
    const notebookId = req.params.notebookId;

    const notebook = await Notebook.findByPk(notebookId);
    const { title } = req.body;

    const newNotebook = await notebook.update({
      title: title,
    });

    return res.json(newNotebook);
  })
);

module.exports = router;
