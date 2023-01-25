import React, { useEffect, useState } from 'react'
import '../movielistitem/MovieListItem.scss'
import { motion } from 'framer-motion'
import{BsFillPlayFill} from 'react-icons/bs'
import {IoAddOutline} from 'react-icons/io5'
import {AiFillLike} from 'react-icons/ai'
import {AiFillDislike} from 'react-icons/ai'
import video from '../../assets/trailer.mp4'
import { Link, useParams } from 'react-router-dom'
import {RiArrowDownSLine} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import {IoCheckmarkOutline} from 'react-icons/io5'
import { add, remove } from '../../features/auth/authSlice'
const MovieListItem = ({movie, isLargeImage, alreadySaved }) => {
  const [hover, setHover] = useState(false);
  const {user, saved} = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const addMovie = ()=>{
    
    dispatch(add({
        userId : user?._id,
        movieId: movie?.id, 
        poster_path: movie?.poster_path,
        backdrop_path: movie?.backdrop_path,
        original_title: movie?.original_title,
        name: movie?.name
    }))
  }
  const removeMovie = ()=>{
    dispatch(remove({
        userId : user?._id,
        movieId: movie?.id || movie.movieId, 
        poster_path: movie?.poster_path,
        backdrop_path: movie?.backdrop_path,
        original_title: movie?.original_title,
        name: movie?.name
    }))
  }
  return (
    <motion.div className='movieListItem__container'
    onMouseOver={()=> setHover(true)}
    onMouseLeave={()=> setHover(false)}
    initial={{
        opacity: 0,
        scale:0
    }}
    animate={{
        opacity: 1,
        scale: 1,
        zIndex:10
    }}
    viewport={{ once: true}}
    transition={{duration: .5}}
    whileHover={{
        

        scale: 1.1,
        zIndex: 20,
        
    }}>
        <img className={`${isLargeImage ? 'movie__posterLagre' : 'movie__poster'}`} src={`https://image.tmdb.org/t/p/original/.${isLargeImage ? movie?.poster_path : movie?.backdrop_path}`} alt="" />
        {
            hover && <video className='movie__video' src={video} autoPlay muted></video>
            
        }
        <div  className='movie__info'>
            <p>{movie?.name || movie?.original_title} </p>
            <div style={{display:'flex',alignItems: 'center', gap: 12}}>
                <Link to={'/watch'}>
                <BsFillPlayFill fontSize={28} className='movie__icon'/>
                </Link>
                <AiFillLike fontSize={28} className='movie__icon'/>
                <AiFillDislike fontSize={28}  className='movie__icon'/>
                {!alreadySaved ? <IoAddOutline onClick={addMovie}  fontSize={28} className='movie__icon'/>
                : <IoCheckmarkOutline onClick={removeMovie} fontSize={28} className='movie__icon' />} 
                <RiArrowDownSLine fontSize={20} style={{marginLeft: 80}} />
            </div>           
        </div>
    </motion.div>
  )
}

export default MovieListItem