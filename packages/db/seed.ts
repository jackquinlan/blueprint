import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    await prisma.example.create({
        data: {
            text: "This is an example model.",
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
