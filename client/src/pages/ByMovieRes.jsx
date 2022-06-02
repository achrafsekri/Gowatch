import React, { useEffect, useContext, useState } from "react";
import { Genre } from "../context/genre";
import axios from "axios";
import { Link } from "react-router-dom";

function ByMovieRes() {
  const { genre, setgenre } = useContext(Genre);
  const [recommendations, setrecomendations] = useState([]);
  const [loading, setloadig] = useState(true);
  console.log();
  useEffect(() => {
    let moviePrefrence = localStorage.getItem("moviePrefrence");
    let recomendationUrl = `http://localhost:4000/recommendations?movieprefrences=${moviePrefrence}`;
    const get_recommendation = async () => {
      await axios
        .get(recomendationUrl)
        .then((res) => res.data.slice(0, 9))
        .then(function (response) {
          response.forEach((movie) => {
            axios
              .get(`http://localhost:4000/movie_info?id=${movie}`)
              .then((response) =>
                setrecomendations((old) => [...old, response.data])
              );
          });
        })
        .then((res) => setloadig(false))
        .catch(function (error) {
          console.log(error);
        });
    };
    get_recommendation();
  }, []);
  console.log(recommendations);

  return (
    <div className="flex items-center justify-center w-screen h-85 bg-background_pm scrollbar">
      <div
        id="recommendations_container"
        className="flex items-center justify-center w-4/6 overflow-auto rounded-md h-5/6 bg-background_pm shadow-pm scrollbar"
      >
        {loading == true ? (
          <div>
            <h1 className="text-3xl font-bold text-white scrollbar ">loading...</h1>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full overflow-auto p-7 scrollbar">
            <h1 className="self-center mb-16 text-3xl font-bold text-white justify-self-start ">
              Here are some of our recommendations
            </h1>
            <div
              id="movies"
              className="grid w-full grid-cols-4 gap-4 p-4 place-content-center"
            >
              {recommendations.map((movie) => (
                <a target="_blank" href={`https://www.imdb.com/title/${movie.imdb_id}`} key={movie.id} className='relative cursor-pointer'>
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-5 text-center duration-300 opacity-0 bg-background_pm hover:opacity-80 bg-opacity-90">
                    <h1 className="text-lg font-bold text-white">{movie.original_title}</h1>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="recommended movie poster"
                    className={movie.poster_path == null ? "hidden " : "card "}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ByMovieRes;
