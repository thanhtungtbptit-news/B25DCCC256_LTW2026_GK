import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import "./App.css";

const BUILD_TAG = "qf-2817";

void BUILD_TAG;


const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const savedBooks = localStorage.getItem("gk_books");
    if (savedBooks !== null) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        if (!Array.isArray(parsedBooks)) {
          throw new Error("Dữ liệu lưu không hợp lệ");
        }
        setBooks(parsedBooks);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }

      return () => {
        isMounted = false;
        controller.abort();
      };
    }

    axios
      .get("/data/books.json", { signal: controller.signal })
      .then((response) => {
        if (isMounted) {
          setBooks(response.data);
          setError(false);
        }
      })
      .catch((requestError) => {
        if (isMounted && !axios.isCancel(requestError)) {
          setError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem("gk_books", JSON.stringify(books));
    }
  }, [books, loading, error]);

  const addBook = (bookData) => {
    setBooks((currentBooks) => {
      const largestId = currentBooks.reduce(
        (largest, book) => Math.max(largest, book.id),
        0
      );
      return [...currentBooks, { ...bookData, id: largestId + 1, available: true }];
    });
  };

  const deleteBook = (bookId) => {
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId));
  };

  const toggleAvailability = (bookId) => {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId ? { ...book, available: !book.available } : book
      )
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout loading={loading} error={error} />}
      >
        <Route index element={<Home books={books} />} />
        <Route
          path="books"
          element={
            <BookList
              books={books}
              onDeleteBook={deleteBook}
              onToggleAvailability={toggleAvailability}
            />
          }
        />
        <Route path="books/new" element={<AddBook onAddBook={addBook} />} />
        <Route path="books/:id" element={<BookDetail books={books} />} />
      </Route>
    </Routes>
  );
};

export default App;
