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
      className="card"
    >
      <img
        src={posterurl}
        alt="poster"
        className={props.posterurl == null ? "hidden" : "card"}
      />
    </Link>
  );
}

export default MovieCard;
