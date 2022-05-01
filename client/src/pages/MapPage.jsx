import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function () {
  const { movieid } = useParams();
  const [movie, setmovie] = useState([]);
  let url = `https://www.myapifilms.com/imdb/idIMDB?idIMDB=${movieid}&token=dc7bac7d-9178-4622-8ab3-fcdaf3c50ecf&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=1&goofs=0&keyword=0&quotes=0&fullSize=1&companyCredits=0&filmingLocations=1&directors=1&writers=1`;
  axios.get(url).then((response) => {
    setmovie(response.data.data.movies[0]);
  });
  
  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
}
