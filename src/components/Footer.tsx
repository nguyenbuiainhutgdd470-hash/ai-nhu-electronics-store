
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
     <div className="container">
      <p>© {year} Như Store · Bài tập môn Công nghệ lập trình hiện đại</p>
      <p>Hotline: 1900 0000 · Email: nguyenbuiainhu.tgdd470@gmail.com</p>
     </div>
    </footer>
  );
}
