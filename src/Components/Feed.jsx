import React, { useEffect, useState } from 'react'
import { db } from "../../firebaseConfig"
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import Story from "./Story"
import AddPost from "./AddPost"
import Post from "./Post"

import "./Feed.css"

function Feed() {
  const [posts, setPosts] = useState([]);
  // const collectionRef = collection(db, "posts");
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getDocs(collection(db, "posts"));
  //     const allPosts = [];
  //     data.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //       allPosts.push(doc.data());
  //     });
  //     setPosts(allPosts);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (data) => {
      const allPosts = [];
      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        allPosts.push({ id: doc.id, ...doc.data() });
      });
      allPosts.sort(function (a, b) { return b.timeStamp - a.timeStamp });
      // console.log(allPosts)
      setPosts(allPosts);
    })
  }, [])


  return (
    <div className="feed">
      <Story />
      <AddPost />
      {posts.map(post => {
        return (
          <Post
            data={post}
          />
        )
      })}
    </div>
  )
}

export default Feed