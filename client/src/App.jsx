import './App.css'
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
function App() {

  return (
    <div className='font-mono antialiased'>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/map/:movieid' element={<MapPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
