import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useEffect, useState} from 'react'

function MovieCard(props) {
  let posterurl=`https://image.tmdb.org/t/p/w500${props.posterurl}`
  let getid=`https://api.themoviedb.org/3/movie/${props.id}/external_ids?api_key=f278a9350a4a2d4ad58f9186c9142f05`
  const [imdbid, setimdbid] = useState('');
  useEffect(() => {
    axios.get(getid).then(res=>{
      setimdbid(res.data.imdb_id)
    })
  }, [])
  
  
  return (
    <Link to={`/map/${imdbid}`} className='w-full rounded-md cursor-pointer shadow-lg shadow-gray-900 hover:opacity-80	' >
      <img src={posterurl} alt="poster" className={props.posterurl==null?"hidden":"w-full rounded-md"}/>
    </Link>
  )
}

export default MovieCard