const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/index.cjs");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(userId, role) {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: "1d" });
}

router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);
  const token = authHeader?.slice(7);
  console.log("TOKEN", token);
  if (!token) return next();
  
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token ID:", id);
    const user = await prisma.user.findUniqueOrThrow({ where: { id }});
    console.log("USER", user)
    req.user = user;
    next();
  } catch (error) {
    next({ status: 401, message: `You're not logged in` })
  }
});


router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next({ status: 400, message: "Username, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const token = createToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({ status: 400, message: "Username and password are required" });
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { username } });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw { status: 401, message: "Invalid Password" };
    }

    const token = createToken(user.id, user.role);

    res.json({ token, role: user.role });
  } catch (error) {
    next(error);
  }
});

function authenticate(req, res, next) {
  if (req.user) {
    return next();
  }
  next({ status: 401, message: "You must be logged in" });
}

module.exports = { router, authenticate };