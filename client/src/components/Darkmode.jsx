import React from 'react'
import '../styles/dark.css'
import { useContext } from "react";
import { Darkmode } from '../context/darkmode';

export default function Darkswitch() {
  const { dark, setdark } = useContext(Darkmode);
  return (
    <div className="">
    <label className="switch">
      <input type="checkbox" onChange={e=>setdark(e.target.checked)}></input>
      <span className="slider"></span>
    </label>
</div>
  )
}
