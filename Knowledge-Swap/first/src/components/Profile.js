import React from 'react';
import Profile1 from '../img/Profile1.jpg';
import './Profile.css';

export default function Profile() {
  return (
    <div>
      {/*Profile*/}
      <div className="profile">
        {/*Profile frame*/}
        <div className="profile-frame">
          {/*Profile pic*/}
          <div className="profile-pic">
            <img src={Profile1} alt="" />
          </div>
          {/*Profile data*/}
          <div className="profile-data">
            <h1>Abhi Kayasth</h1>
            <div className="profile-info" style={{display:"flex"}}>
              <p>4 Posts</p>
              <p>200 Followers</p>
              <p>500 Following</p>
            </div>
          </div>
        </div>
      </div>
      <hr style={{
        width:"90%",
        opacity:"0.8",
        margin:"25px auto"
      }}/>
      {/*Gallery*/}
      <div className="gallery">
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
        <img src={Profile1} alt="" />
      </div>
    </div>
  )
}
