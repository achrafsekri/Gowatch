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
    <div className="flex flex-col items-center min-h-screen pt-20 overflow-auto max-w-screen bg-background_pm scrollbar">
      <div className="flex flex-col items-center justify-center w-3/4 gap-8 scrollbar ">
        <h1 className="text-5xl font-bold leading-relaxed tracking-wide text-center text-white scrollbar">
          Type a movie or a tv show's name and get recomondations
        </h1>
        <div className="flex justify-between w-3/4 h-12 bg-white rounded shadow-pm scrollbar">
          <input
            type="text"
            className="w-full h-full p-3 bg-white rounded outline-none "
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
          <h1 className="p-4 text-lg text-left text-white opacity-80">
            Select the movie or tv show you are looking for
          </h1>
          <div className="grid w-full grid-cols-4 gap-4 p-4 place-content-center scrollbar">
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
