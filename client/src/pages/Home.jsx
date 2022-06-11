import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [result, setresult] = useState([]);
  const [display, setdisplay] = useState("none");
  

  const handlesearch = (e) => {
    e.preventDefault();
    let tmdbkey = "f278a9350a4a2d4ad58f9186c9142f05";
    let displayurl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbkey}&query=${e.target.value}&page=1&include_adult=false`;
    setdisplay("display");
    axios.get(displayurl).then((response) => {
      setresult(response.data.results);
    });
  };

  return (
    <div className="flex flex-col items-center min-h-full pt-20 overflow-auto bg-background_am max-w-screen dark:bg-background_pm scrollbar">
      <div className="flex flex-col items-center justify-center w-3/4 gap-8 scrollbar ">
        <h1 className="text-2xl font-bold leading-relaxed tracking-wide text-center text-gray-800 sm:text-5xl dark:text-slate-50 scrollbar">
          Type a movie or a tv show's name and get recomondations
        </h1>
        <div className="flex justify-between h-12 rounded-lg sm:w-3/4 bg-slate-50 shadow-am dark:shadow-pm scrollbar">
          <input
            type="text"
            className="w-full h-full p-3 rounded outline-none bg-slate-50 "
            placeholder="Write any movie's name"
            onChange={handlesearch}
            onKeyDown={e=>e.key=='Enter'&&handlesearch()}
          />
          <a
            onClick={handlesearch}
            className="flex items-center justify-center p-4 cursor-pointer rounded-l-md "
          >
            <span className="material-icons ">search</span>
          </a>
        </div>
        <div className={display == "none" ? "hidden" : "scrollbar"}>
          <h1 className="p-4 text-sm text-left text-gray-800 sm:text-lg dark:text-slate-50 opacity-80">
            Select the movie or tv show you are looking for
          </h1>
          <div className="grid w-full grid-cols-2 gap-4 p-4 sm:grid-cols-4 place-content-center scrollbar">
            {result.map((film) => (
              <MovieCard
                key={film.id}
                id={film.id}
                genre={film.genre_ids}
                posterurl={film.poster_path}
                title={film.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
