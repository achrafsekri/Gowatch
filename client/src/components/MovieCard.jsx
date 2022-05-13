import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Genre } from "../context/genre";

function MovieCard(props) {
  let posterurl = `https://image.tmdb.org/t/p/w500${props.posterurl}`;
  const { genre, setgenre } = useContext(Genre);

  const handleselectmovie = () => {
    setgenre(props.genre);
  };

  return (
    <Link
      to={`/similar/${props.id}`}
      onClick={handleselectmovie}
      className="w-full rounded-md cursor-pointer shadow-lg shadow-gray-900 hover:opacity-80	"
    >
      <img
        src={posterurl}
        alt="poster"
        className={props.posterurl == null ? "hidden" : "w-full rounded-md"}
      />
    </Link>
  );
}

export default MovieCard;
