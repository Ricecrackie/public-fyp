import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TextSystem from './pages/TextSystem';
import ImageSystem from './pages/ImageSystem';
import TextResult from './pages/TextResult';
import React, {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import ImageResult from './pages/ImageResult';
function App() {
  return (
    <div>
    {/* <Navbar></Navbar> */}
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/text" element={<TextSystem/>}/>
        <Route path="/image" element={<ImageSystem/>}/>
        <Route path="/text_result" element = {<TextResult/>}/>
        <Route path="/image_result" element={<ImageResult/>}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
