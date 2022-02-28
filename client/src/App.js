import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import OperationCreate from "./components/create/OperationCreate";
import ModifyOperation from "./components/modify/ModifyOperation";


function App() {
  return (
    <BrowserRouter>
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createOperation" element={ <OperationCreate/> } />
        <Route path="/modifyOperation/:id" element={<ModifyOperation/>} />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
