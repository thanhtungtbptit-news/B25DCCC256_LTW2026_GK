import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("Văn học");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (title.trim() === "" || author.trim() === "" || year === "" || year === null) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!Number.isInteger(Number(year)) || Number(year) < 1900 || Number(year) > 2026) {
      setErrorMessage("Năm xuất bản phải từ 1900 đến 2026");
      return;
    }

    onAddBook({
      title: title.trim(),
      author: author.trim(),
      year: Number(year),
      category,
    });
    navigate("/books", { replace: true });
  };

  return (
    <section className="form-page">
      <h1>Thêm sách mới</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Tên sách</label>
          <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="author">Tác giả</label>
          <input id="author" type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="year">Năm xuất bản</label>
          <input
            id="year"
            type="number"
            step="1"
            value={year}
            onChange={(event) => setYear(event.target.value === "" ? "" : Number(event.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Thể loại</label>
          <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <button type="submit">Thêm</button>
        {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default AddBook;
