import { productMock } from "../../produtos/mocks/productMock";

export const cartMock = [
  {
    product: productMock.find(
      (product) => product.id === "relaxar-01"
    ),
    quantity: 1,
  },

  {
    product: productMock.find(
      (product) => product.id === "cafe-02"
    ),
    quantity: 2,
  },

  {
    product: productMock.find(
      (product) => product.id === "gourmet-01"
    ),
    quantity: 1,
  },
];