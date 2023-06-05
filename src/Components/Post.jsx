import React from 'react'

import { Avatar } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

import storyBg from "/storyBg.jpg"
import profile from "/profile.jpeg"

import "./Post.css"

function Post(props) {
  const { data } = props;
  const date = new Date(data.timeStamp).toDateString();
  return (
    <div className="post">
      <div className="post__heading">
        <Avatar src={data.creatorImage} />
        <div className="post__heading-details">
          <h4>{data.creatorName}</h4>
          <p>{date}</p>
        </div>
      </div>
      <div className="post__content">
        <div className="post__content-caption">
          <p>{data.postText}</p>
        </div>
        <div className="post__content-main">
          <img src={data.postImage} alt="" />
        </div>
      </div>
      <div className="react">
        <div className="like react-comp">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="comment react-comp">
          <CommentIcon />
          <p>Comment</p>
        </div>
        <div className="share react-comp">
          <ShareIcon />
          <p>Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post