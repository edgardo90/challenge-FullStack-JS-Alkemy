import { BrowserRouter, Route, Routes } from "react-router-dom";
import OperationCreate from "./components/create/OperationCreate";
import Home from "./components/home/Home";


function App() {
  return (
    <BrowserRouter>
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createOperation" element={ <OperationCreate/> } />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
