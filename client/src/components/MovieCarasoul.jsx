import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MovieCarasoul(props) {
  const [carasoul, setcarasoul] = useState(-1);
  const [movietodisplay, setmovietodisplay] = useState([]);
  const [movieslist, setmovieslist] = useState([{id:props.movieid,rating:0}]);
  const navigate=useNavigate();

  useEffect(() => {
    carasoul==8&&navigate('/bymv-result');
  },[carasoul])
  
  
  const getsimilars = async () => {
    await axios
      .get(`http://localhost:4000/similar?id=${props.movieid}`)
      .then((result) => {
        setmovietodisplay(result.data);
      });
  };
  getsimilars().catch((er) => {
    console.log(er);
  });

  const likehandle = () => {
    setcarasoul((carasoul) => (carasoul = carasoul + 1));
    setmovieslist(movie=>[... movie,{ id: movietodisplay[carasoul].id,rating:1}])
  };
  const unlikelikehandle = () => {
    setcarasoul((carasoul) => (carasoul = carasoul + 1));
    setmovieslist(movie=>[... movie,{ id: movietodisplay[carasoul].id,rating:-1}])
  };
  const neverhandle = () => {
    setcarasoul((carasoul) => (carasoul = carasoul + 1));
    setmovieslist(movie=>[... movie,{ id: movietodisplay[carasoul].id,rating:0}])
  };
  return (
    <div className="min-w-4/6 w-4/6 h-5/6 min-h-5/6 bg-slate-200 flex justify-center items-center rounded-md">
      {carasoul == -1 && (
        <div className="w-3/4 ">
          <h1 className="text-gray-900 font-bold text-3xl max-w-4/6">
            We need some more information to optimize your result, here are some
            similar movies, tell us which ones you liked and which ones you
            didn't.
          </h1>
          <div className="flex place-self-end mt-5 gap-10">
            <button
              className="bg-transparent hover:bg-gray-900 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded"
              onClick={() => setcarasoul(0)}
            >
              {" "}
              lets go!
            </button>
            <button className="bg-transparent hover:bg-gray-900 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded">
              {" "}
              show me unoptimized
            </button>
          </div>
        </div>
      )}
      {carasoul != -1 && (
        <div className="flex w-full h-full ">
          <div className="flex flex-1 items-center justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movietodisplay[carasoul].poster_path}`}
              alt="poster"
              className=" h-5/6 rounded-md border-slate-900 border-2"
            />
          </div>
          <div className="flex flex-col gap-7 flex-1 items-center justify-center">
            <div className="flex w-3/4">
              <h1 className="text-gray-900 font-semibold">
                movie {carasoul + 1} :{" "}
                <a
                  href={`https://imdb.com/${movietodisplay[carasoul].id}`}
                  target="_blank"
                  className="underline"
                >
                  {movietodisplay[carasoul].title}
                </a>
              </h1>
            </div>
            <button
              onClick={likehandle}
              className="bg-transparent w-3/4 hover:bg-green-700 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded"
            >
              I ve seen it and I like it{" "}
            </button>
            <button
              onClick={unlikelikehandle}
              className="bg-transparent w-3/4 hover:bg-gray-700 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded"
            >
              I ve never seen it{" "}
            </button>
            <button
              onClick={neverhandle}
              className="bg-transparent w-3/4 hover:bg-red-600 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded"
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
