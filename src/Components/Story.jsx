import React from 'react'

import { Avatar } from '@mui/material';

import storyBg from "/storyBg.jpg"
import profile from "/profile.jpeg"

import "./Story.css"

function Story() { 
  return (
    <article className="story">
      <img src={storyBg} alt="" className="story__bg" />
      <Avatar src={profile} className="story__avatar"/>
      <p className="story__name" >Chandrachur</p>
    </article>
  )
}

export default Story