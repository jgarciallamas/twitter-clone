import { PrismaClient } from "@prisma/client";

// let global = {};
// console.log("global#1", global);
console.log("lib/prisma");
const prisma = global.prisma || new PrismaClient({ log: ["info"] });
// PrismaClient({ log: ["query"] });
// console.log("prisma -->", prisma);

if (process.env.NODE_ENV === "development") global.prisma = prisma;
// console.log("global#2", global);
// console.log("NODE_ENV", process.env.NODE_ENV);

export default prisma;
// import { PrismaClient } from "@prisma/client";

// let global = {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   prisma: PrismaClient | undefined,
// };

// const prisma = global.prisma || new PrismaClient({ log: ["info"] });

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export default prisma;
