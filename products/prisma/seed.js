const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const faker = require("faker");

async function main() {
  const brandNames = ["Dior", "Chanel", "Louis Vuitton", "Prada"];

  const brands = await Promise.all(
    brandNames.map((brandName, index) => {
      return prisma.brand.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name: brandName,
        },
      });
    })
  );

  const products = [
    { brandId: 1, name: "Handcrafted Granite Sausages" },
    { brandId: 1, name: "Rustic Steel Soap" },
    { brandId: 1, name: "Incredible Granite Sausages" },
    { brandId: 1, name: "Handcrafted Steel Salad" },
    { brandId: 1, name: "Incredible Cotton Towels" },
    { brandId: 1, name: "Fantastic Plastic Hat" },
    { brandId: 1, name: "Licensed Wooden Gloves" },
    { brandId: 1, name: "Incredible Plastic Gloves" },
    { brandId: 1, name: "Handcrafted Wooden Pants" },
    { brandId: 1, name: "Small Soft Hat" },
    { brandId: 2, name: "Refined Granite Cheese" },
    { brandId: 2, name: "Licensed Soft Table" },
    { brandId: 2, name: "Unbranded Steel Tuna" },
    { brandId: 2, name: "Small Steel Tuna" },
    { brandId: 2, name: "Ergonomic Fresh Cheese" },
    { brandId: 2, name: "Unbranded Steel Sausages" },
    { brandId: 2, name: "Fantastic Frozen Cheese" },
    { brandId: 2, name: "Generic Steel Chair" },
    { brandId: 2, name: "Fantastic Concrete Chicken" },
    { brandId: 2, name: "Ergonomic Concrete Tuna" },
    { brandId: 3, name: "Rustic Granite Towels" },
    { brandId: 3, name: "Incredible Cotton Towels" },
    { brandId: 3, name: "Handmade Rubber Mouse" },
    { brandId: 3, name: "Licensed Fresh Keyboard" },
    { brandId: 3, name: "Ergonomic Wooden Keyboard" },
    { brandId: 3, name: "Licensed Plastic Bacon" },
    { brandId: 3, name: "Small Fresh Chair" },
    { brandId: 3, name: "Handcrafted Soft Cheese" },
    { brandId: 3, name: "Handmade Concrete Sausages" },
    { brandId: 3, name: "Practical Fresh Pants" },
    { brandId: 4, name: "Tasty Steel Chips" },
    { brandId: 4, name: "Fantastic Steel Fish" },
    { brandId: 4, name: "Ergonomic Plastic Pizza" },
    { brandId: 4, name: "Refined Soft Sausages" },
    { brandId: 4, name: "Incredible Wooden Pizza" },
    { brandId: 4, name: "Sleek Soft Soap" },
    { brandId: 4, name: "Small Rubber Shoes" },
    { brandId: 4, name: "Ergonomic Cotton Gloves" },
    { brandId: 4, name: "Unbranded Concrete Soap" },
    { brandId: 4, name: "Handcrafted Rubber Fish" },
  ];

  await Promise.all(
    products.map(({ brandId, name }, index) => {
      return prisma.product.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name,
          brandId,
          color: faker.commerce.color(),
          price: Math.floor(Math.random() * 100),
        },
      });
    })
  );
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
