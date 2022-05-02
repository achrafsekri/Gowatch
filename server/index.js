const express=require('express')
const cors=require('cors')
const axios=require('axios')
const pretty=require('pretty')
const cheerio = require('cheerio')

const app=express()
app.use(cors())

app.get('/locations',async (req,res)=>{
    const locations = [];
    const url = `https://www.imdb.com/title/${req.query.id}/locations#filming_locations`;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const listItems = $("#filming_locations div");
      listItems.each((idx, el) => {
        const location = { adress: "", scene: "" };
        location.adress = $(el).children("dt").children("a").text();
        location.scene = $(el).children("dd").text();
        locations.push(location);
      });
  
    } catch (err) {
      console.error(err);
    }
  res.send(locations)
})



// async function scrapeData() {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     const listItems = $("#filming_locations div");
//     const locations = [];
//     listItems.each((idx, el) => {
//       const location = { adress: "", scene: "" };
//       location.adress = $(el).children("dt").children("a").text();
//       location.scene = $(el).children("dd").text();
//       locations.push(location);
//     });
//     console.dir(locations);

//   } catch (err) {
//     console.error(err);
//   }
// }

app.listen(4000,() => {
    console.log(`listening on port 4000`)
  })