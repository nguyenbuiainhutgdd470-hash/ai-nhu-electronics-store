
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

type Props = {
  title: string;
  items: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ProductList({
  title,
  items,
  onAddToCart,
}: Props) {
  return (
    <section className="container">
      <h2 className="section-title">{title}</h2>

      <div className="product-grid">
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
