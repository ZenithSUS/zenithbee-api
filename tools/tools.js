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
  {
    type: "function",
    function: {
      name: "fetchReservedByLength",
      description:
        "Fetch a specific number of reserved products from ZenithBee based on the user's requested amount.",
      parameters: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            description: "The user's ID.",
          },
          length: {
            type: "number",
            description: "The number of reserved products to retrieve.",
          },
        },
        required: ["userId", "length"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fetchProductByAttribute",
      description:
        "Fetch a specific product from ZenithBee based on the user's requested attribute.",
      parameters: {
        type: "object",
        properties: {
          value: {
            type: "string",
            description: "The value to search for.",
          },
        },
        required: ["value"],
      },
    },
  },
];
