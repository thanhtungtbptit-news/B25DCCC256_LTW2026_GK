import { Link } from "react-router-dom";

const BookRow = ({ book, onDeleteBook, onToggleAvailability }) => {
  const { id, title, author, year, category, available } = book;

  return (
    <tr className={available ? "" : "book-borrowed"}>
      <td><Link to={`/books/${id}`}>{title}</Link></td>
      <td>{author}</td>
      <td>{year}</td>
      <td>{category}</td>
      <td>{available ? "Có sẵn" : "Đang mượn"}</td>
      <td className="actions-cell">
        <button type="button" onClick={() => onToggleAvailability(id)}>
          {available ? "Cho mượn" : "Nhận trả"}
        </button>
        <button
          type="button"
          className="button-danger"
          onClick={() => onDeleteBook(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default BookRow;
