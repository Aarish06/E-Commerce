import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "T-Shirt", price: 29.99, description: "Cotton tee", category: "Clothing", image: "" },
      { name: "Sneakers", price: 89.99, description: "Running shoes", category: "Footwear", image: "" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("Seeded 🌱"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());