import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import OperationCreate from "./components/create/OperationCreate";
import ModifyOperation from "./components/modify/ModifyOperation";
import PageNotFound from "./components/not-found/PageNotFound";


function App() {
  return (
    <BrowserRouter>
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createOperation/" element={ <OperationCreate/> } />
        <Route path="/modifyOperation/:id" element={<ModifyOperation/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
