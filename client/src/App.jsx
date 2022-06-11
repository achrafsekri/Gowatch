
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Similar from "./pages/Similar";
import ByMovieRes from "./pages/ByMovieRes";
import { Genre } from "./context/genre";
import { useState } from "react";
import { Darkmode } from "./context/darkmode";
function App() {
  const [genre, setgenre] = useState(null);
  const [dark, setdark] = useState(false);
  return (
    <Genre.Provider value={{ genre, setgenre }}>
      <Darkmode.Provider value={{ dark, setdark }}>
        <div
          className={
            dark === true
              ? "font-mono antialiased  w-screen h-screen dark flex items-center flex-col bg-background_pm"
              : "font-mono antialiased  w-screen h-screen flex items-center flex-col bg-background_am"
          }
        >
          <div className="max-h-screen 2xl:w-mx">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/bymv-result" element={<ByMovieRes />}></Route>
              <Route path="/similar/:movieid" element={<Similar />}></Route>
            </Routes>
          </BrowserRouter>
          </div>
        </div>
      </Darkmode.Provider>
    </Genre.Provider>
  );
}

export default App;
