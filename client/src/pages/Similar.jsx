import React from "react";
import { useParams } from "react-router-dom";
import MovieCarasoul from "../components/MovieCarasoul";
export default function Similar() {
  const { movieid } = useParams();
  return (
    <div className="flex flex-col items-center min-h-screen gap-4 pt-20 max-w-screen sm:h-full bg-background_am dark:bg-background_pm"> 
      <MovieCarasoul movieid={movieid}/>
    </div>
  );
}
