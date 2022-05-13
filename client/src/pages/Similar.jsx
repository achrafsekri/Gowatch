import React from "react";
import { useParams } from "react-router-dom";
import MovieCarasoul from "../components/MovieCarasoul";
export default function Similar() {
  const { movieid } = useParams();
  return (
    <div className="max-w-screen h-85 bg-gray-900	flex flex-col items-center pt-20 gap-4"> 
      <MovieCarasoul movieid={movieid}/>
    </div>
  );
}
