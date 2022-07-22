import React, { useState, useEffect } from 'react'
import axios from 'axios'

import "./comments.css"


function Comments ({post}) {

    const [comments, setComments] = useState("");
    const [comment, setComment] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComments = {
      comments,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/comments", newComments);
      res.data();
    } catch (err) {}
    window.location.reload();
    return setComments("");
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get("/comments");
      setComment(res.data);
    };
    getComments();
  }, []);

  return (
    <section id="app">
      <form onSubmit={handleSubmit}>
          <div className='container'>
      <div className='row'>
        <div className='column'>
        <div className='comment'>
          <h1 className='comment-header'>Comments</h1>
          {comment.map((c, i)=>(
          <div key={i}>
             {i+1}. {c.comments} 
          </div>
        ))}
          </div>
          </div>
          </div>
      <div className='row'>
        <div className='column'>
      <textarea type="text" className='input' placeholder="Write a comment" value={comments} onChange={(e)=> setComments(e.target.value)} ></textarea>
          <button className='primaryContained float-right' type="submit">Add Comment</button>
        </div>
      </div>
    </div>
      </form>
    
  </section>
  )
}

export default Comments;
