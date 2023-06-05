import React, { useContext, useState } from 'react'
import { collection, addDoc } from "firebase/firestore";

import { Avatar } from "@mui/material"
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import "./AddPost.css"
import { db } from "../../firebaseConfig"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../Auth';

function AddPost() {
  const { currentUser } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posting, setPosting] = useState(false);

  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(prev => !prev);
    // TODO: create provision for create post with only text
    const storageRef = ref(storage, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          try {
            const docRef = await addDoc(collection(db, "posts"), {
              postText: text,
              postImage: downloadURL,
              creatorName: currentUser.displayName,
              creatorImage: currentUser.photoURL,
              creator: currentUser.uid,
              timeStamp: Date.now()
            });
            console.log("Document written with ID: ", docRef.id);
            setText("");
            setPosting(prev => !prev);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );
  }

  return (
    <div className="addPost">
      <form onSubmit={handleSubmit}>
        <div className="addPost__top">
          <Avatar src={currentUser.photoURL} />
          <div className="addPost__input">
            <input
              type="text"
              className="addPost__input-box"
              placeholder={`What's on your mind, ${currentUser.displayName} ?`}
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)} />
          </div>
          <input
            type="file"
            className="addPost__input-file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])} />
          {!posting ?
            <Button
              varient="contained"
              sx={{ color: "#e9ebee", backgroundColor: "#4267b3" }}
              onClick={handleSubmit}
            >
              Post
            </Button>
            :
            <LoadingButton
              loading
              loadingIndicator="Posting…"
              varient="outlined"
            >
              Fetch data
            </LoadingButton>}

        </div>
      </form>

      <div className="messageSender__button">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <p>Live Video</p>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <p>Photo/video</p>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <p>Feelings/activity</p>
        </div>

      </div>
    </div>
  )
}

export default AddPost