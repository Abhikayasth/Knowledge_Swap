import React from 'react';
import Profile from '../img/Profile.jpg';
import './Home.css';

export default function Home() {
  return (
    <div className='home'>
      {/*card...*/}
      <div className="card">
        {/*card headers*/}
        <div className="card-header">
          <div className="card-pic" >
            <img src={Profile} alt="" />
          </div>
          <h5>Abhi</h5>
        </div>
        {/*card image*/}
        <div className="card-image">
          <img src={Profile} alt="" />
        </div>
        {/*card content*/}
        <div className="card-content">
          <span className="material-symbols-outlined">favorite</span>
          <p>1 Like</p>
          <p>This is amazing..</p>
        </div>
        {/*Add comment*/}
        <div className="add-comment">
        <span className="material-symbols-outlined">mood</span>
        <input type="text" placeholder="Add a comment..." />
        <button className="comment">Post</button>
        </div>
      </div>
    </div>
  )
}
