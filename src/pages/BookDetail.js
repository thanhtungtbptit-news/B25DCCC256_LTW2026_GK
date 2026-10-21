import { useNavigate, useParams } from "react-router-dom";

const BookDetail = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const book = books.find((item) => item.id === numericId);

  if (!Number.isFinite(numericId) || !book) {
    return (
      <section>
        <p>Không tìm thấy sách.</p>
        <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
      </section>
    );
  }

  return (
    <section>
      <h1>Chi tiết sách</h1>
      <p>Tên sách: {book.title}</p>
      <p>Tác giả: {book.author}</p>
      <p>Năm xuất bản: {book.year}</p>
      <p>Thể loại: {book.category}</p>
      <p>Trạng thái: {book.available ? "Có sẵn" : "Đang mượn"}</p>
      <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
    </section>
  );
};

export default BookDetail;
