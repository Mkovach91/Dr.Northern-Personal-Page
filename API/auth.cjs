const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/index.cjs");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
}

// Middleware to parse and verify JWT
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);
  const token = authHeader?.slice(7); 
  console.log("TOKEN", token);

  if (!token) return next();

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token ID:", id);
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    console.log("USER", user);
    req.user = user;
    next();
  } catch (error) {
    next({ status: 401, message: `You're not logged in` });
  }
});

// Register route
router.post("/register", async (req, res, next) => {
  const { email, password, registrationCode } = req.body;

  if (!email || !password || !registrationCode) {
    return next({
      status: 400,
      message: "Email, password, and registration code are required",
    });
  }

  try {
    const code = await prisma.registrationCode.findUnique({
      where: { code: registrationCode },
    });

    if (!code) {
      return next({ status: 400, message: "Invalid registration code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "STUDENT", 
        student: {
          create: {
            enrolledAt: new Date(),
          },
        },
      },
    });

    const token = createToken(user);
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    if (error.code === "P2002") {
      next({ status: 400, message: "Email is already registered" });
    } else {
      next(error);
    }
  }
});

// Login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({ status: 400, message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw { status: 401, message: "Invalid Password" };
    }

    const token = createToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    if (error.name === "NotFoundError") {
      next({ status: 404, message: "User not found" });
    } else {
      next(error);
    }
  }
});

// Middleware to protect routes
function authenticate(req, res, next) {
  if (req.user) {
    return next();
  }
  next({ status: 401, message: "You must be logged in" });
}

module.exports = { router, authenticate };
