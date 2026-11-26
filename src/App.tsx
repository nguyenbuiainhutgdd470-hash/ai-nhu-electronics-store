
import { useState } from "react";

import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

import type { CartItem } from "./components/Cart";
import type { Product } from "./data/products";

import { products } from "./data/products";
import { filterProducts } from "./utils/product";

import "./App.css";

function StatePracticeExample() {
  // useState lưu giá trị thay đổi; setter cập nhật state và khiến React render lại.
  const [quantity, setQuantity] = useState(0);
  const [keyword, setKeyword] = useState("");
  const normalizedKeyword = keyword.trim().toLowerCase();
  const matchingProducts = normalizedKeyword
    ? products.filter((product) =>
        product.name.toLowerCase().includes(normalizedKeyword),
      )
    : [];

  return (
    <section className="container" style={{ marginTop: 40, marginBottom: 40 }}>
      <h2 className="section-title">Thực hành useState</h2>

      <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* onClick chạy hàm cập nhật số lượng khi nhấn nút. */}
          <button
            className="btn"
            style={{ width: "auto" }}
            onClick={() => setQuantity((current) => Math.max(0, current - 1))}
          >
            Giảm
          </button>
          <button
            className="btn"
            style={{ width: "auto" }}
            onClick={() => setQuantity((current) => current + 1)}
          >
            Tăng
          </button>
        </div>

        {/* Conditional rendering chọn nội dung theo giá trị quantity. */}
        {quantity === 0 ? (
          <p>Chưa có sản phẩm</p>
        ) : (
          <p>Số lượng hiện tại: {quantity}</p>
        )}

        <label htmlFor="state-practice-keyword">
          Tên sản phẩm hoặc từ khóa tìm kiếm
        </label>
        <input
          id="state-practice-keyword"
          type="text"
          value={keyword}
          placeholder="Nhập từ khóa..."
          onChange={(event) => setKeyword(event.target.value)}
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #d1d5db",
            borderRadius: 8,
          }}
        />
        {normalizedKeyword &&
          (matchingProducts.length > 0 ? (
            <ul style={{ display: "grid", gap: 6, paddingLeft: 20 }}>
              {matchingProducts.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <p>Không tìm thấy sản phẩm</p>
          ))}
      </div>
    </section>
  );
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      if (product.stock <= 0) {
        return currentItems;
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((items) =>
        items.filter((item) => item.product.id !== id)
      );
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: Math.min(quantity, item.product.stock),
            }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number) => {
    setCartItems((items) =>
      items.filter((item) => item.product.id !== id)
    );
  };

  // Tổng số lượng sản phẩm trong giỏ
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cheapProducts = filterProducts(products, {
    maxPrice: 300000,
    sort: "asc",
  });
  const electronics = filterProducts(products, { category: "Điện tử" });
  const lowStockProducts = products.filter(
    (product) => 1 <= product.stock && product.stock <= 5,
  );

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
        onHomeClick={() => setShowCart(false)}
      />

      {showCart ? (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onContinueShopping={() => setShowCart(false)}
        />
      ) : (
        <main>
          <Banner />
          <CategoryList />
          <ProductList
            title="Sản phẩm nổi bật"
            items={products}
            onAddToCart={addToCart}
          />
          <ProductList
            title="Giá dưới 300.000 đ"
            items={cheapProducts}
            onAddToCart={addToCart}
          />
          <ProductList
            title="Đồ điện tử"
            items={electronics}
            onAddToCart={addToCart}
          />
          <ProductList
            title="Sản phẩm sắp hết hàng"
            items={lowStockProducts}
            onAddToCart={addToCart}
          />
          <StatePracticeExample />
        </main>
      )}

      <Footer />
    </>
  );
}

export default App;
