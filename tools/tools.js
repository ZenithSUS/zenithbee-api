export const tools = [
  {
    type: "function",
    function: {
      name: "fetchProducts",
      description: "Get all products in ZenithBee",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetchProductByLength",
      description:
        "Fetch a specific number of food products from ZenithBee based on the user's requested amount.",
      parameters: {
        type: "object",
        properties: {
          length: {
            type: "number",
            description: "The number of products to retrieve.",
          },
        },
        required: ["length"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetchPopularProducts",
      description: "Fetch the popular products from ZenithBee",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];
