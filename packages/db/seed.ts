import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: "Alice",
            email: "alice@exampe.com",
        },
    });
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
