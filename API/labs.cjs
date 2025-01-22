const express = require("express");
const prisma = require("../prisma/index.cjs");
const { authenticate } = require("./auth.cjs");

const router = express.Router();

router.use(authenticate);

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    return next();
  }
  return next({ status: 403, message: "Forbidden: Admin access required" });
}

// Get all labs
router.get("/", async (req, res, next) => {
  try {
    const labs = await prisma.lab.findMany({
      include: {
        students: true, 
      },
    });

    res.json(labs);
  } catch (error) {
    console.error("Failed to find any labs:", error);
    next(error);
  }
});

// Get a single lab by ID
router.get("/:id", async (req, res, next) => {
  try {
    const lab = await prisma.lab.findUnique({
      where: { id: +req.params.id },
      include: { students: true }, 
    });

    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    res.json(lab);
  } catch (error) {
    console.error("Failed to find the lab:", error);
    next(error);
  }
});

// Create a new lab (admin only)
router.post("/", isAdmin, async (req, res, next) => {
  const { name, description, studentIds = [] } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  try {
    const newLab = await prisma.lab.create({
      data: {
        name,
        description,
        students: {
          connect: studentIds.map((id) => ({ id })),
        },
      },
    });

    res.status(201).json(newLab);
  } catch (error) {
    console.error("Error creating lab:", error);
    next(error);
  }
});

// Add a student to a lab (admin only)
router.post("/:id/students", isAdmin, async (req, res, next) => {
  const { id: labId } = req.params;
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  try {
    const lab = await prisma.lab.findUnique({ where: { id: +labId } });

    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    const updatedLab = await prisma.lab.update({
      where: { id: +labId },
      data: {
        students: {
          connect: { id: +studentId },
        },
      },
    });

    res.json(updatedLab);
  } catch (error) {
    console.error("Error adding student to lab:", error);
    next(error);
  }
});

// Remove a student from a lab (admin only)
router.delete("/:id/students/:studentId", isAdmin, async (req, res, next) => {
  const { id: labId, studentId } = req.params;

  try {
    const lab = await prisma.lab.findUnique({
      where: { id: +labId },
      include: { students: true },
    });

    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    const studentExists = lab.students.some((student) => student.id === +studentId);
    if (!studentExists) {
      return res.status(404).json({ error: "Student not found in the lab" });
    }

    const updatedLab = await prisma.lab.update({
      where: { id: +labId },
      data: {
        students: {
          disconnect: { id: +studentId },
        },
      },
    });

    res.json(updatedLab);
  } catch (error) {
    console.error("Error removing student from lab:", error);
    next(error);
  }
});

module.exports = router;
