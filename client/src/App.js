import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";


function App() {
  return (
    <BrowserRouter>
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
