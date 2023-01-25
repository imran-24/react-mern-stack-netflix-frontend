import React from 'react'
import '../watch/Watch.scss'
import {BsArrowLeft} from 'react-icons/bs'
import video from '../../assets/trailer.mp4'
import {useNavigate} from 'react-router-dom'
const Watch = () => {
  const navigate = useNavigate();
  return (
    <div className='watch__container'>
        <div className='back__btn'>
          <BsArrowLeft fontSize={32} onClick={()=> navigate(-1)} />
        </div>
        <video className='video' src={video} autoPlay loop controls muted></video>
    </div>
  )
}

export default Watch