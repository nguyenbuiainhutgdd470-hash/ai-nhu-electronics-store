
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type Props = {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onContinueShopping: () => void;
};

export default function Cart({
  items,
  onUpdateQuantity,
  onRemove,
  onContinueShopping,
}: Props) {
  const totalPrice = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="container cart-page">
      <h2 className="section-title">Giỏ hàng của bạn</h2>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h3>Giỏ hàng đang trống!</h3>
          <p>Hãy chọn sản phẩm bạn yêu thích.</p>

          <button className="btn" onClick={onContinueShopping}>
            Tiếp tục mua hàng
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>

                  <p className="product-price">
                    {item.product.price.toLocaleString("vi-VN")} đ
                  </p>

                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      disabled={item.quantity >= item.product.stock}
                      onClick={() =>
                        onUpdateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-action">
                  <strong>
                    {(item.product.price * item.quantity).toLocaleString("vi-VN")} đ
                  </strong>

                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.product.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Tổng thanh toán</h3>

            <p className="total-price">
              {totalPrice.toLocaleString("vi-VN")} đ
            </p>

            <button className="btn">
              Tiến hành mua hàng
            </button>
          </div>
        </>
      )}
    </main>
  );
}
