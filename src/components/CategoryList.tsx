
import { products } from "../data/products";

export default function CategoryList() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="container category-section">
      <h2 className="section-title">Danh mục sản phẩm</h2>

      <div className="category-list">
        {categories.map((category) => (
          <button className="category-item" key={category}>
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
