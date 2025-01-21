const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
require("dotenv").config();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: "penorthern@semo.edu",
      password: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin);

  // Create some registration codes
  const registrationCodes = await prisma.registrationCode.createMany({
    data: [
      { code: "STUDENT2023" },
      { code: "STUDENT2024" },
      { code: "STUDENT2025" },
    ],
  });
  console.log("Registration codes created:", registrationCodes);

  // Create labs
  const lab1 = await prisma.lab.create({
    data: {
      name: "Psychology Lab 1",
      description: "",
    },
  });

  const lab2 = await prisma.lab.create({
    data: {
      name: "Psychology Lab 2",
      description: "",
    },
  });

  console.log("Labs created:", { lab1, lab2 });

  // Create three student users
  const studentPasswordHash = await bcrypt.hash("student", 10);

  const student1 = await prisma.user.create({
    data: {
      email: "student1@school.com",
      password: studentPasswordHash,
      role: "STUDENT",
      student: {
        create: {
          enrolledAt: new Date(),
        },
      },
    },
    include: { student: true },
  });

  const student2 = await prisma.user.create({
    data: {
      email: "student2@school.com",
      password: studentPasswordHash,
      role: "STUDENT",
      student: {
        create: {
          enrolledAt: new Date(),
        },
      },
    },
    include: { student: true },
  });

  const student3 = await prisma.user.create({
    data: {
      email: "student3@school.com",
      password: studentPasswordHash,
      role: "STUDENT",
      student: {
        create: {
          enrolledAt: new Date(),
        },
      },
    },
    include: { student: true },
  });

  console.log("Student users created:", { student1, student2, student3 });

  // Assign students to labs
  await prisma.lab.update({
    where: { id: lab1.id },
    data: {
      students: {
        connect: [
          { id: student1.student.id },
          { id: student2.student.id },
        ],
      },
    },
  });

  await prisma.lab.update({
    where: { id: lab2.id },
    data: {
      students: {
        connect: [
          { id: student2.student.id },
          { id: student3.student.id },
        ],
      },
    },
  });

  console.log("Students assigned to labs.");
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
