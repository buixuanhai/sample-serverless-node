const axios = require("axios");

class ProductSearchService {
  search = async ({ page = 1, pageSize = 5, search = "" }) => {
    if (search) {
      axios.post("http://localhost:3000/dev/activityLogs", {
        type: "search",
        payload: search,
      });
    }
    return (result = await prisma.product.findMany({
      skip: (page - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    }));
  };
}

module.exports = ProductSearchService;
