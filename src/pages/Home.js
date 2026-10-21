const Home = ({ books }) => {
  const borrowedCount = books.reduce(
    (count, book) => count + (book.available ? 0 : 1),
    0
  );
  const newestYear = books.reduce(
    (latest, book) => Math.max(latest, Number(book.year) || 0),
    0
  );

  return (
    <section>
      <h1>Thư viện sách</h1>
      <p>Tổng số sách: {books.length}</p>
      <p>Số sách đang cho mượn: {borrowedCount}</p>
      <p>Năm xuất bản mới nhất: {newestYear}</p>
    </section>
  );
};

export default Home;
