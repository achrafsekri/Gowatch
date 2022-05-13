import './App.css'
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Similar from './pages/Similar'
import ByMovieRes from './pages/ByMovieRes';
import { Genre } from './context/genre';
import { useState } from 'react';
function App() {
const [genre,setgenre]=useState(null)
  return (
    <Genre.Provider value={{genre,setgenre}}>
    <div className='font-mono antialiased'>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/bymv-result' element={<ByMovieRes/>}></Route>
      <Route path='/similar/:movieid' element={<Similar/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    </Genre.Provider>
  )
}

export default App
