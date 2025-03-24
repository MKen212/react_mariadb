import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const ListBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const resp = await axios.get("http://raspi4b-a60e722a:8080/books");
      console.log(resp);
      setBooks(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (bookID) => {
    try {
      await axios.delete("http://raspi4b-a60e722a:8080/books/" + bookID);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => {
          // console.log(book);
          return(
            <div key={book.BookID} className="book">
              {book.CoverFilename && <img src={book.CoverFilename} alt="" />}
              <h2>{book.Title}</h2>
              <p>{book.Description}</p>
              <span>CHF {book.Price}</span>
              <button className="delete" onClick={() => handleDelete(book.BookID)}>Delete</button>
              <button className="update">Update</button>
            </div>
          );
        })}
      </div>
      {/* Add Book */}
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default ListBooks;
