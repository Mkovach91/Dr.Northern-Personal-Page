const express = require("express");
const prisma = require("../prisma/index.cjs");
const { authenticate } = require("./auth.cjs");

const router = express.Router();
router.use(authenticate);


router.get("/", async (req, res, next) => {
  try {
    const comments = await prisma.calendarComment.findMany();
    const dates = [...new Set(comments.map(c => c.date.toDateString()))];
    res.json(dates);
  } catch (error) {
    next(error);
  }
});

router.get("/comments", async (req, res, next) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date is required" });

  try {
    const parsedDate = new Date(date);
    const comments = await prisma.calendarComment.findMany({
      where: {
        date: {
          gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
          lt: new Date(parsedDate.setHours(23, 59, 59, 999))
        }
      },
      include: { user: true }
    });

    res.json(comments.map(c => `${c.user.name}: ${c.comment}`));
  } catch (error) {
    next(error);
  }
});

router.post("/comments", async (req, res, next) => {
  const { date, comment } = req.body;
  if (!date || !comment) return res.status(400).json({ error: "Date and comment required" });

  try {
    const newComment = await prisma.calendarComment.create({
      data: {
        date: new Date(date),
        comment,
        userId: req.user.id
      },
      include: { user: true }
    });

    const allComments = await prisma.calendarComment.findMany({
      where: {
        date: {
          gte: new Date(newComment.date.setHours(0, 0, 0, 0)),
          lt: new Date(newComment.date.setHours(23, 59, 59, 999))
        }
      },
      include: { user: true }
    });

    res.status(201).json(allComments.map(c => `${c.user.name}: ${c.comment}`));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
