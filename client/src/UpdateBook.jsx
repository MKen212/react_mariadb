import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    coverFilename: "",
    price: 0.00,
  });

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname.split("/")[2]);
  const bookID = location.pathname.split("/")[2];  

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://raspi4b-a60e722a:8080/books/"+bookID, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Update Existing Book</h1>
      <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="description" id="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="coverFilename" id="coverFilename" placeholder="Cover Filename" onChange={handleChange} />
      <input type="number" min={0.00} step={0.01} name="price" id="price" placeholder="Price" onChange={handleChange} />

      <button className="formButton" type="submit" onClick={handleClick}>Update</button>
    </div>
  );
};

export default UpdateBook;
