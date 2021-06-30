// Models
import Product from "../models/Product";

const fakeStoreApiUrl = "https://fakestoreapi.com/";

const getProductList = async (): Promise<Array<Product>> => {
  const response = await fetch(fakeStoreApiUrl + "products");
  const body = await response.json();
  return body;
};

const getCategoryList = async (): Promise<Array<string>> => {
  const response = await fetch(fakeStoreApiUrl + "products/categories");
  const body = await response.json();
  return body;
};

const getCategoryProducts = async (
  category: string
): Promise<Array<Product>> => {
  let url = fakeStoreApiUrl + "products/";

  if (category !== "All Categories") {
    url += `category/${category}`;
  }

  const response = await fetch(url);
  const body = await response.json();
  return body;
};

const getProductById = async (productId: number): Promise<Product> => {
  const response = await fetch(fakeStoreApiUrl + "products/" + productId);
  const body = await response.json();
  return body;
};

export { getProductList, getCategoryList, getCategoryProducts, getProductById };
