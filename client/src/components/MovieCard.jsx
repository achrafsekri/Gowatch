import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Genre } from "../context/genre";
import '../styles/moviecard.css'

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
      className="bg-background_am dark:bg-background_pm shadow-am dark:shadow-pm"
    >
      <img
        src={posterurl}
        alt="poster"
        className={props.posterurl == null ? "hidden h-inherit w-inherit" : "card"}
      />
    </Link>
  );
}

export default MovieCard;
