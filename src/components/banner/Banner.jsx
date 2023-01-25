import React, { useEffect, useState } from 'react'
import '../banner/Banner.scss'
import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { genre } from '../../data'
import requests from '../../request'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const {movies} = useSelector(state => state.netflix);
  useEffect(()=>  {
    function fetchData(){ 
        
        
        setBanner(movies[
            Math.floor(Math.random() * movies?.length - 1  )
        ])
    }
    fetchData();
  },[movies])
  
  return (
    <header className='banner__container'
        style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner?.backdrop_path})`,
        backgroundSize: 'cover',
        objectFit: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',}} 
    >
    {/* <img className='banner_img' src={`https://image.tmdb.org/t/p/original/.${banner?.posterImg}`} alt="" /> */}
    <div className='banner__info'>
            {/* {
                type && (
                    <div className='genre'>
                <label className=''>Movie</label>
                <select name="genre" className=''>
                    {
                        genre.map(item => (
                            <option value="comedy">{item}</option> 
                        ))
                    }
                </select>
            </div>
                )
            } */}
            <div className='information'>
                
                <h1 className='title'>{banner?.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='play__btn'>
                        <BsFillPlayFill fontSize={24} />
                        <Link to={'/watch'}>
                        <span>
                          play  
                        </span>
                        </Link>
                        </button>
                    <button className='info__btn'>
                        <AiOutlineInfoCircle fontSize={24} />
                        <span>info</span>
                    </button>
                </div>
                <h1 className='overview'>{ banner?.overview?.length > 200 ? banner?.overview.slice(0, 200)+ '...' : banner?.overview }</h1>
            </div>
        </div>
        <div className='bottom__fade'></div>
    </header>
  )
}

export default Banner