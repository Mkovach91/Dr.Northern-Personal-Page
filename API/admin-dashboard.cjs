const express = require("express");
const prisma = require("../prisma/index.cjs");
const { authenticate } = require("./auth.cjs");

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    return next();
  }
  return next({ status: 403, message: "Forbidden: Admin access required" });
}

router.use(authenticate);

router.get("/", isAdmin, async (req, res, next) => {
  try {
    if (req.user.role === "ADMIN") {
      const users = await prisma.user.findMany({
        include: {
          student: true, 
        },
      });

      return res.json({ users });
    } else {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { student: true }, 
      });

      if (!user) {
        return next({ status: 404, message: "User not found" });
      }

      return res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;