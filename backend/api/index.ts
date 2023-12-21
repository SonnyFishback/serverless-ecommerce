export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
       products: [{
        id: 1,
        name: "Product 1",
        price: 100,
        description: "Product 1 description"
       }]
      },
      null,
      2
    ),
  };
};
