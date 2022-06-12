import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MovieCarasoul(props) {
  const [carasoul, setcarasoul] = useState(-1);
  const [similarmovies, setsimilarmovies] = useState([
    { id: "", poster_path: "", title: "" },
  ]);
  const [movieslist, setmovieslist] = useState([
    { id: props.movieid, rating: 1 },
  ]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (carasoul == 8 || (carasoul==similarmovies.length-1 && similarmovies.length!=1 )) {
      localStorage.setItem("moviePrefrence", JSON.stringify(movieslist));
      navigate("/bymv-result");
    }
  }, [carasoul]);

  useEffect(() => {
    const getsimilars = async () => {
      await axios
        .get(`http://localhost:4000/similar?id=${props.movieid}`)
        .then((response) => {
          response.data!=[]?setsimilarmovies(response.data):axios.get(`http://localhost:4000/unoptimized_similars?id=${props.movieid}`).then(res=>setsimilarmovies(res.data))
          
        }).then(r=>setloading(false));
      
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
    <div className="flex items-center justify-center mb-10 ml-4 mr-4 rounded-md min-h-96 sm:mb-0 sm:w-4/6 sm:h-5/6 bg-background_am dark:bg-background_pm shadow-am dark:shadow-pm">
      {carasoul == -1 && (
        <div className="flex flex-col items-center justify-center w-3/4 gap-4 h-96 sm:h-full">
          <h1 className="font-bold text-gray-800 sm:text-3xl dark:text-white max-w-4/6">
            We need some more information to optimize your result, here are some
            similar movies, tell us which ones you liked and which ones you
            didn't.
          </h1>
          <div className="flex w-full gap-4 mt-5 sm:gap-10">
            <button
              className="flex-1 px-4 py-2 text-sm font-semibold text-gray-800 bg-transparent border border-gray-900 rounded sm:text-xl dark:text-slate-50 dark:border-white dark:hover:shadow-pm dark:shadow-none shadow-am dark:hover:bg-transparent hover:bg-gray-100"
              onClick={() => setcarasoul(0)}
            >
              {" "}
              lets go!
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-semibold text-gray-800 bg-transparent border border-gray-900 rounded sm:text-xl dark:text-slate-50 dark:border-white dark:hover:shadow-pm dark:shadow-none shadow-am dark:hover:bg-transparent hover:bg-gray-100">
              {" "}
              show me unoptimized
            </button>
          </div>
        </div>
      )}
      {carasoul != -1 && loading == false && (
        <div className="w-full h-full text-gray-800 sm:flex dark:text-slate-50 ">
          <div className="flex items-center justify-center flex-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${similarmovies[carasoul].poster_path}`}
              alt="poster"
              className="mt-10 mb-10 border-2 rounded-md sm:mb-0 sm:mt-0 dark:border-white h-72 sm:h-5/6 shadow-am dark:shadow-pm"
            />
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-7">
            <div className="flex w-3/4">
              <h1 className="font-semibold ">
                movie {carasoul + 1} :{" "}
                <a
                  href={typeof similarmovies[carasoul].imdb_id!== 'undefined' && `https://www.imdb.com/title/${similarmovies[carasoul].imdb_id}`}
                  target="_blank"
                  className="underline"
                >
                  {similarmovies[carasoul].title}
                </a>
              </h1>
            </div>
            <button
              onClick={likehandle}
              className="w-5/6 px-4 py-2 font-semibold bg-transparent border border-gray-800 rounded sm:w-3/4 dark:border-white hover:text-slate-50 hover:bg-green-700 hover:border-transparent"
            >
              I ve seen it and I like it{" "}
            </button>
            <button
              onClick={unlikelikehandle}
              className="w-5/6 px-4 py-2 font-semibold bg-transparent border border-gray-800 rounded sm:w-3/4 dark:border-white hover:text-slate-50 hover:bg-gray-700 hover:border-transparent"
            >
              I ve never seen it{" "}
            </button>
            <button
              onClick={neverhandle}
              className="w-5/6 px-4 py-2 mb-10 font-semibold bg-transparent border border-gray-800 rounded sm:w-3/4 sm:mb-0 dark:border-white hover:bg-red-600 hover:text-slate-50 hover:border-transparent"
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
