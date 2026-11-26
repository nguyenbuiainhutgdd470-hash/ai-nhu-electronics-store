
type Props = {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
};

export default function Header({
  cartCount,
  onCartClick,
  onHomeClick,
}: Props) {
  return (
    <header className="header">
      <div className="container header-inner">

        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            onHomeClick();
          }}
        >
          Như<span>Store</span>
        </a>

        <nav className="nav">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
            }}
          >
            Trang chủ
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
            }}
          >
            Sản phẩm
          </a>

          <a href="#gioi-thieu">
            Giới thiệu
          </a>
        </nav>

        <button
          type="button"
          className="cart-link"
          onClick={onCartClick}
        >
          🛒 Giỏ hàng ({cartCount})
        </button>

      </div>
    </header>
  );
}
