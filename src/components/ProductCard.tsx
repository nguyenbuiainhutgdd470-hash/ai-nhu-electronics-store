
import { formatPrice } from "../utils/format";
import type { Product } from "../data/products";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: Props) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-body">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-price">
          {formatPrice(product.price)}
        </p>

        {isOutOfStock && (
          <span className="out-of-stock">
            Hết hàng
          </span>
        )}

        <button
          className="btn"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product)}
        >
          {isOutOfStock ? "Đã hết hàng" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
}
