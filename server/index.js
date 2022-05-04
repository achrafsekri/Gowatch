require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const pretty = require("pretty");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

//routes

app.get("/similar", async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/${req.query.id}/similar?api_key=${process.env.TMDB_API_TOKEN}&language=en-US&page=1`;

  await axios.get(url).then((result) => {
    res.send(result.data.results);
  });
});

//todo: /simrecom return an array of similar and recomandations of a given movies id [{id,rating}]

app.get("/recommendations", (req, res) => {
  const movieavis = req.query.movielist;
  let movie_list = [];
  movieavis.forEach( async (movie) => {
    movie.rate == 1 || movie.rate == 0
      ? await axios.get(`/simrecom?id=${movie.id}`).then((result) => {
          result.forEach((Element) => movie_list.push(Element));
        })
      : null;
  });
});

app.listen(4000, () => {
  console.log(`listening on port 4000`);
});
