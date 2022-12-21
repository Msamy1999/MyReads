import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./components/Bookshelf";
import { useNavigate } from "react-router-dom";

/*
 * I create the changeShelf method to move a book between shelves.
 */
const bookshelves = [
  { title: "Currently Reading", shelfName: "currentlyReading" },
  { title: "Want to Read", shelfName: "wantToRead" },
  { title: "Read", shelfName: "read" },
];
/*
 * The list of books is the first of the identified states.
 */
const App = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BooksAPI.getAll().then((booksFromApi) => {
      setBooks(booksFromApi);
    });
  }, []);

  /*
   * Importing the Router & using "exact path"
   */
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf, index) => (
              <Bookshelf
                key={index}
                title={bookshelf.title}
                books={
                  books &&
                  books.filter(
                    (book) => book && book.shelf === bookshelf.shelfName
                  )
                }
                setBooks={setBooks}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => navigate("/SearchReasults")}>
            Add a book
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
