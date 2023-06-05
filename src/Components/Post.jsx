import React, { useContext, useRef, useEffect, useState } from 'react'

import { Avatar } from "@mui/material"
import { Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';


import { AuthContext } from '../Auth';
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../../firebaseConfig';

import "./Post.css"

function Post(props) {
  const [open, setOpen] = useState(false);
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


  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

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
          {data.creator === currentUser.uid &&
            <div className='menu-container' ref={menuRef}>
              <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                <IconButton >
                  <MoreVertIcon />
                </IconButton>
              </div>

              <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                <ul>
                  <li className='dropdownItem' onClick={handleDelete}>
                    <DeleteIcon />
                    <p> Delete </p>
                  </li>
                  <li className='dropdownItem'>
                    <EditIcon />
                    <p> Edit </p>
                  </li>
                </ul>
              </div>
            </div>}
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