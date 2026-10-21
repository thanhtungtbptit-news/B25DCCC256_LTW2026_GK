import { useEffect, useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import BookTable from "../components/BookTable";
import { CATEGORIES } from "../data";

const BookList = ({ books, onDeleteBook, onToggleAvailability }) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const handleQueryShift = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(timerId);
  }, [keyword]);

  const filteredBooks = useMemo(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLocaleLowerCase("vi");
    return books.filter((book) => {
      const matchesTitle = book.title.toLocaleLowerCase("vi").includes(normalizedKeyword);
      const matchesCategory = category === "Tất cả" || book.category === category;
      return matchesTitle && matchesCategory;
    });
  }, [books, debouncedKeyword, category]);

  return (
    <section>
      <h1>Danh sách sách</h1>
      <FilterBar
        keyword={keyword}
        category={category}
        categories={CATEGORIES}
        isSearching={keyword !== debouncedKeyword}
        onKeywordChange={handleQueryShift}
        onCategoryChange={setCategory}
      />
      <BookTable
        books={filteredBooks}
        onDeleteBook={onDeleteBook}
        onToggleAvailability={onToggleAvailability}
      />
    </section>
  );
};

export default BookList;
