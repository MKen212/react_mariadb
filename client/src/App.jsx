import { BrowserRouter, Routes, Route } from "react-router";
import ListBooks from "./ListBooks";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListBooks/>}/>
            <Route path="/add" element={<AddBook/>}/>
            <Route path="/update" element={<UpdateBook/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
};

export default App;
