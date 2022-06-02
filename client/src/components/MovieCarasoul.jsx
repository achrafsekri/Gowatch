import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MovieCarasoul(props) {
  const [carasoul, setcarasoul] = useState(-1);
  const [similarmovies, setsimilarmovies] = useState([
    { id: "", poster_path: "", title: "" },
  ]);
  const [movieslist, setmovieslist] = useState([
    { id: props.movieid, rating: 0 },
  ]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (carasoul == 8) {
      localStorage.setItem("moviePrefrence", JSON.stringify(movieslist));
      navigate("/bymv-result");
    }
  }, [carasoul]);

  useEffect(() => {
    const getsimilars = async () => {
      await axios
        .get(`http://localhost:4000/similar?id=${props.movieid}`)
        .then((response) => {
          response.data==[]?setsimilarmovies(response.data):axios.get(`http://localhost:4000/similar?id=${props.movieid}`).then(res=>setsimilarmovies(res.data))
          
        });
      setloading(false);
    };
    getsimilars().catch((er) => {
      console.log(er);
    });
  }, []);

  const likehandle = () => {
    setcarasoul((carasoul) => (carasoul = carasoul + 1));
    setmovieslist((movie) => [
      ...movie,
      { id: similarmovies[carasoul].id, rating: 1 },
    ]);
  };
  const unlikelikehandle = () => {
    setcarasoul((carasoul) => (carasoul = carasoul + 1));
    setmovieslist((movie) => [
      ...movie,
      { id: similarmovies[carasoul].id, rating: -1 },
    ]);
  };
  const neverhandle = () => {
    setcarasoul((carasoul) => (carasoul = carasoul + 1));
    setmovieslist((movie) => [
      ...movie,
      { id: similarmovies[carasoul].id, rating: 0 },
    ]);
  };
  return (
    <div className="flex items-center justify-center w-4/6 rounded-md min-w-4/6 h-5/6 min-h-5/6 bg-background_pm shadow-pm">
      {carasoul == -1 && (
        <div className="w-3/4 ">
          <h1 className="text-3xl font-bold text-white max-w-4/6">
            We need some more information to optimize your result, here are some
            similar movies, tell us which ones you liked and which ones you
            didn't.
          </h1>
          <div className="flex gap-10 mt-5 place-self-end">
            <button
              className="px-4 py-2 font-semibold text-white bg-transparent border border-white rounded hover:shadow-pm"
              onClick={() => setcarasoul(0)}
            >
              {" "}
              lets go!
            </button>
            <button className="px-4 py-2 font-semibold text-white bg-transparent border border-white rounded hover:shadow-pm">
              {" "}
              show me unoptimized
            </button>
          </div>
        </div>
      )}
      {carasoul != -1 && loading == false && (
        <div className="flex w-full h-full ">
          <div className="flex items-center justify-center flex-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${similarmovies[carasoul].poster_path}`}
              alt="poster"
              className="border-2 border-white rounded-md h-5/6 shadow-pm"
            />
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-7">
            <div className="flex w-3/4">
              <h1 className="font-semibold text-white">
                movie {carasoul + 1} :{" "}
                <a
                  href={`https://imdb.com/${similarmovies[carasoul].id}`}
                  target="_blank"
                  className="underline"
                >
                  {similarmovies[carasoul].title}
                </a>
              </h1>
            </div>
            <button
              onClick={likehandle}
              className="w-3/4 px-4 py-2 font-semibold text-white bg-transparent border border-white rounded hover:bg-green-700 hover:text-white hover:border-transparent"
            >
              I ve seen it and I like it{" "}
            </button>
            <button
              onClick={unlikelikehandle}
              className="w-3/4 px-4 py-2 font-semibold text-white bg-transparent border border-white rounded hover:bg-gray-700 hover:text-white hover:border-transparent"
            >
              I ve never seen it{" "}
            </button>
            <button
              onClick={neverhandle}
              className="w-3/4 px-4 py-2 font-semibold text-white bg-transparent border border-white rounded hover:bg-red-600 hover:text-white hover:border-transparent"
            >
              I ve seen it and I didn't like it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCarasoul;
