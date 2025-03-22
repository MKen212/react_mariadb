import { useEffect, useState } from "react";
import axios from "axios";


const ListBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const resp = await axios.get("http://raspi4b-a60e722a:8080/books");
      // console.log(resp);
      setBooks(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    // console.log(books);
  }, []);

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => {
          // console.log(book);
          return(
            <div className="book">
              {book.CoverFilename && <img src={book.CoverFilename} alt="" />}
              <h2>{book.Title}</h2>
              <p>{book.Description}</p>
              {/* <span>{book.Price}</span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListBooks;
