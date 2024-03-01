import React,{useState} from 'react';
import Profile from '../img/Profile.jpg';
import Image_icon from '../img/Image_icon.jpg';
import './CreatePost.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
const [body, setBody] = useState("");
const [image, setImage] = useState("");
const navigate = useNavigate()

//Toast function.....
const notifyA = (msg) => toast.error(msg);
const notifyB = (msg) => toast.success(msg);

//Posting image to cloudinary
const postDetails = ()=>{
  console.log(body, image);
  const data = new FormData()
  data.append("file",image)
  data.append("upload_preset", "Knowledge-Swap")
  data.append("cloud_name","communitycloud")
  fetch("https://api.cloudinary.com/v1_1/communitycloud/image/upload",{
    method:"post",
    body:data
  })
  .then(response=>response.json())
  .then(data => {
    //saving post to mongodb
    fetch("http://localhost:5000/createPost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic:data.url
      })
    }).then(response => response.json())
    .then(data => {if(data.error){
      notifyA(data.error)
    }else{
      notifyB("Successfully Posted....")
      navigate("/")
    }})
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

  const loadfile = (event) =>{
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function(){
      URL.revokeObjectURL(output.src) //free memory
    }
  }
  return (
    <div className='createPost'>
      <div className='post-header'>
        <h4 style={{margin:"3px auto"}}>Create new Post</h4>
        <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
      </div>
      {/*Image preview*/}
      <div className='main-div'>
        <img id='output' src={Image_icon} alt='' />
        <input type='file' accept='image/*' onChange={(event)=>{loadfile(event); setImage(event.target.files[0])}} />
      </div>
      <div className='details'>
        <div className='card-header'>
          <div className='card-pic'>
            <img src={Profile} alt=''/>
          </div>
          <h5>Abhi</h5>
        </div>
        <textarea value={body} onChange={(e)=>{
          setBody(e.target.value)
        }} type='text' placeholder="Write a Caption..."></textarea>
      </div>
    </div>
  );
}
