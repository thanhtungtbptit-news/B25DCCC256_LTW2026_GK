import BookRow from "./BookRow";

const BookTable = ({ books, onDeleteBook, onToggleAvailability }) => (
  <>
    <p className="result-count">Tìm thấy {books.length} cuốn sách</p>
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Năm</th>
            <th>Thể loại</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookRow
              key={book.id}
              book={book}
              onDeleteBook={onDeleteBook}
              onToggleAvailability={onToggleAvailability}
            />
          ))}
        </tbody>
      </table>
    </div>
    {books.length === 0 && <p className="empty-state">Không có dữ liệu</p>}
  </>
);

export default BookTable;
