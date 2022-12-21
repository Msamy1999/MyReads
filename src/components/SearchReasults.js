import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

const SearchReasults = () => {
  const [searchText, setSearchText] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const navigate = useNavigate();

  const handleSearchTextChange = (event) => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then((searchBooks) => {
        if (!searchBooks.error) {
          BooksAPI.getAll().then((myBooks) => {
            setSearchBooks(setDefaultShelves(searchBooks, myBooks));
          });
        } else {
          setSearchBooks([]);
        }
      });
    } else if (searchText.length === 0) {
      setSearchBooks([]);
    }
  };

  const setDefaultShelves = (searchedBooksLocal, myBooks) => {
    return searchedBooksLocal.map((book) => {
      for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === book.id) {
          return { ...book, shelf: myBooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  };
  useEffect(() => {
    handleSearchTextChange();
    // eslint-disable-next-line
  }, [searchText]);
  /*
   * The matchedBooks array will hold the books that match the search query,
   */
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => navigate("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooks &&
            searchBooks.map((book, index) => (
              <Book
                key={index}
                title={book.title}
                authors={book.authors}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                bookshelf={book.shelf}
                book={book}
                isSearching
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchReasults;
