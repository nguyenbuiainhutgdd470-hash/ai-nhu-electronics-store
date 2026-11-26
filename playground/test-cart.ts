// Chạy: node playground/test-cart.ts
import { registerHooks } from "node:module";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  countItems,
  calcTotal,
} from "../src/utils/cart.ts";
import type { CartItem } from "../src/utils/cart.ts";
import { formatPrice } from "../src/utils/format.ts";
import {
  groupByCategory,
  filterProducts,
  getCategories,
  searchByPriceRange,
} from "../src/utils/product.ts";

registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".jpg")) {
      return {
        format: "module",
        shortCircuit: true,
        source: "export default " + JSON.stringify(url),
      };
    }
    return nextLoad(url, context);
  },
});

const { products } = await import("../src/data/products.ts");

let cart: CartItem[] = [];
cart = addToCart(cart, products[0]); // Áo thun x1
cart = addToCart(cart, products[0], 2); // Áo thun x3
cart = addToCart(cart, products[3]); // Bình giữ nhiệt x1
console.log("Số sản phẩm:", countItems(cart)); // 4
console.log("Tổng tiền:", formatPrice(calcTotal(cart))); // 635.000 đ

cart = updateQuantity(cart, products[0].id, 1);
cart = removeFromCart(cart, products[3].id);
console.log(cart.map((i) => `${i.product.name} x${i.quantity}`));

console.log("Danh mục:", getCategories(products));
console.log(
  "Điện tử, giá tăng dần:",
  filterProducts(products, { category: "Điện tử", sort: "asc" }).map(
    (p) => p.name,
  ),
);
console.log(
  "Tìm 'áo', tối đa 300k:",
  filterProducts(products, { keyword: "áo", maxPrice: 300000 }).map(
    (p) => p.name,
  ),
);
console.log(
  "Sản phẩm từ 150k đến 300k:",
  searchByPriceRange(products, 150000, 300000).map((p) => p.name),
);
console.log("Thống kê danh mục:", groupByCategory(products));
