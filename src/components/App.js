import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./user/login";
import Home from "./home/home";
import Messenger from "./chat/Messenger";


const App = () => {

  return (

    <div className="app">
      <BrowserRouter>

        <Routes>

         <Route path="/*" element={ <Home/> } />

         <Route path='/chat'  element={<Messenger />} />
 
          {/* start user */}
          <Route path="/login" element={<Login />} />
          {/* end user */}

        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
