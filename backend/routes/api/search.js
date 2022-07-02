const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.post(
  "/notes",
  asyncHandler(async (req, res) => {
    const { results, userId } = req.body;

    const notes = await Note.findAll({
      where: {
        title: {
          [Op.iLike]: `%${results}%`,
        },
        userId: userId,
      },
    });

    res.json(notes);
  })
);

module.exports = router;
