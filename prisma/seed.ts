import bcrypt from "bcrypt";
import { ROLES } from "@/app/lib/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const password = await bcrypt.hash("pass", 10);
  await prisma.user.createMany({
    data: [
      {
        email: "luis@example.com",
        name: "Luis",
        role: ROLES.TEACHER,
        password,
      },
      {
        email: "ger@example.com",
        name: "Ger",
        role: ROLES.STUDENT,
        password,
      },
      {
        email: "charly@example.com",
        name: "Charly",
        role: ROLES.STUDENT,
        password,
      },
      {
        email: "juan@example.com",
        name: "Juan",
        role: ROLES.TUTOR,
        password,
      },
    ],
  });
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
