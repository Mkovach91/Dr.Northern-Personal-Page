const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma/index.cjs')
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);

  if (!token){
    return next();
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUniqueOrThrow({ where: { id } })
    req.user = user;
    next();
  } catch (error) {
    next({ status: 401, message: "You're not logged in" });
  }
}

router.post('/', authenticateToken, async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if(!req.user){
    return res.status(401).json({ error: "Please log in" });
  }

  try {
    const user = req.user
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if(!isMatch){
      return res.status(400).json({ error: "Inccorect Password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password has been change" })
  } catch (error) {
    next(error);
  }
})

module.exports = router;