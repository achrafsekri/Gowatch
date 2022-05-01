import React from 'react'
import {Link} from "react-router-dom"

function MovieCard(props) {
  return (
    <Link to='/map/' className='w-full rounded-md cursor-pointer'>
      <img src={props.posterurl} alt="oster" className='w-full rounded-md'/>
    </Link>
  )
}

export default MovieCard