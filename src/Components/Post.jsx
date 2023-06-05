import React, { useContext } from 'react'

import { Avatar } from "@mui/material"
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListIcon from '@mui/icons-material/List';

import { AuthContext } from '../Auth';
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../../firebaseConfig';

import "./Post.css"

function Post(props) {
  const { data } = props;
  console.log(data)
  const date = new Date(data.timeStamp).toDateString();

  const { currentUser } = useContext(AuthContext);

  const handleDelete = () => {
    const postRef = doc(db, "posts", data.id);
    deleteDoc(postRef)
      .then(() => {
        console.log("Post deleted successfully.")
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="post">
      <div className="post__heading">
        <div className="post__heading-left">
          <Avatar src={data.creatorImage} />
          <div className="post__heading-details">
            <h4>{data.creatorName}</h4>
            <p>{date}</p>
          </div>
        </div>
        <div className="post__heading-right">
          {/* <MoreVertIcon /> */}
          {data.creator === currentUser.uid &&
            <Button
              varient="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>}
        </div>
      </div>
      <div className="post__content">
        <div className="post__content-caption">
          <p>{data.postText}</p>
        </div>
        {data.postImage &&
          <div className="post__content-main">
            <img src={data.postImage} alt="" />
          </div>}
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