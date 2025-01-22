const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prisma/index.cjs");
const { authenticate } = require("./auth.cjs");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { student: true }, 
    });

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const studentDetails = user.student ? user.student : false;

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      student: studentDetails,
    });
  } catch (error) {
    next(error);
  }
});

// Update user information
router.put("/", authenticate, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const updatedData = {};

    if (email) updatedData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updatedData,
    });

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    if (error.code === "P2002") {
      next({ status: 400, message: "Email is already in use" });
    } else {
      next(error);
    }
  }
});

module.exports = router;