import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    coverFilename: "",
    price: 0.00,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://raspi4b-a60e722a:8080/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="description" id="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="coverFilename" id="coverFilename" placeholder="Cover Filename" onChange={handleChange} />
      <input type="number" min={0.00} step={0.01} name="price" id="price" placeholder="Price" onChange={handleChange} />

      <button type="submit" onClick={handleClick}>Add</button>
    </div>
  );
};

export default AddBook;
