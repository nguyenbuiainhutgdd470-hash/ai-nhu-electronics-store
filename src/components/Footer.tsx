
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
     <div className="container">
      <p>© {year} Cửa hàng bán đồ điện tử Ái Như</p>
      <p>Hotline: 1900 0000 · Email: languyenbuiainhu.tgdd470@gmail.com</p>
     </div>
    </footer>
  );
}
