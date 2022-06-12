require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

//routes

const exist = (currentMovie, similarMovie) => {
  let len = similarMovie.length;
  similarMovie.forEach((genre) => {
    if (currentMovie.indexOf(genre) == -1) {
      len--;
    }
  });
  if (len == 0) {
    return false;
  }
  return true;
};

app.get("/", (req, res) => {
  res.send("server started");
});

app.get("/movie_info", (req, res) => {
  const api = `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.TMDB_API_TOKEN}&language=en-US`;
  axios.get(api).then((response) => res.send(response.data));
});

app.get("/similar", async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/${req.query.id}/similar?api_key=${process.env.TMDB_API_TOKEN}&language=en-US&page=2`;
  const current_movie_url = `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.TMDB_API_TOKEN}&language=en-US`;
  let current_movie_genres = await axios.get(current_movie_url);
  current_movie_genres = current_movie_genres.data.genres.map(
    (genre) => (genre = genre.id)
  );

  let similars = await axios.get(url);
  similars = similars.data.results;
  similars = similars.filter((movie) =>
    exist(current_movie_genres, movie.genre_ids)
  );
  res.send(similars);
});
app.get("/unoptimized_similars", async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/${req.query.id}/similar?api_key=${process.env.TMDB_API_TOKEN}&language=en-US&page=1`;
  await axios.get(url).then((responce) => res.send(responce.data));
});

const repetition_exist = (list, movie) => {
  list.forEach((single) => {
    if (single.movie.id === movie.movie.id) {
      return true;
    }
  });
  return false;
};
const frequncyOf = (movie, list) => {
  let index = 0;
  list.forEach((single) => {
    single.id == movie.id && index++;
  });
  return index;
};

const removeRep = (list) => {
  let unique = [];
  list.forEach((movie) => {
    if (unique.indexOf(movie.movie.id) == -1) {
      unique.push(movie.movie.id);
    }
  });

  return unique;
};

const sort = (movieList) => {
  for (let i = 0; i < movieList.length; i++) {
    for (let j = 1; j < movieList.length; j++) {
      if (movieList[i].frequancy > movieList[j].frequancy) {
        let aux = movieList[i];
        movieList[i] = movieList[j];
        movieList[j] = aux;
      }
    }
  }
  return movieList;
};

app.get("/recommendations", async (req, res) => {
  const movieprefrences = JSON.parse(req.query.movieprefrences);
  let movie_list = [];
  let promises = [];
  movieprefrences.forEach(async (movie) => {
    movie.rating == 1 || movie.rating == 0
      ? promises.push(
          axios
            .get(`http://localhost:4000/similar?id=${movie.id}`)
            .then((result) => {
              result.data.forEach((Element) => movie_list.push(Element));
            })
            .catch(function (error) {
              console.log(error);
            })
        )
      : null;
  });
  Promise.all(promises)
    .then(() =>
      movie_list.filter((movie) => movieprefrences.indexOf(movie.id) < 0)
    )
    .then((filtredlist) => {
      let frequancy = [];
      filtredlist.forEach((movie) => {
        frequancy.push({
          movie: movie,
          frequancy: frequncyOf(movie, filtredlist),
        });
      });
      return frequancy;
    })
    .then((list) => sort(list))
    .then((list) => res.send(removeRep(list)));
  //
  // console.log(movieprefrences);
  // console.log(original_genre);
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port 4000`);
});
