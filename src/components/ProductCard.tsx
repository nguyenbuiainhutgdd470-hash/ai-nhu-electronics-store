
import type { Product } from "../data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const isOutOfStock = product.stock === 0;

  console.log("KIỂM TRA:", product.name, product.stock, isOutOfStock);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-body">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-price">
          {product.price.toLocaleString("vi-VN")} đ
        </p>

        {isOutOfStock && (
          <span className="out-of-stock">
            Hết hàng
          </span>
        )}

        <button
          className="btn"
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Đã hết hàng" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
}
