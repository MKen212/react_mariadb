import { BrowserRouter, Routes, Route } from "react-router";
import ListBooks from "./ListBooks";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListBooks/>}/>
            <Route path="/add" element={<AddBook/>}/>
            <Route path="/update/:bookid" element={<UpdateBook/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App;
