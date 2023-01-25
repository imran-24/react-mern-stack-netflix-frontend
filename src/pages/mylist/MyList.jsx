import React from 'react'
import '../mylist/MyList.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Unavailable from '../../components/unavailable/Unavailable'
import Navbar from '../../components/navbar/Navbar'
import { useEffect } from 'react'
import { getSaved } from '../../features/auth/authSlice'
import MovieList from '../../components/movielist/MovieList'
import MovieListItem from '../../components/movielistitem/MovieListItem'


const MyList = () => {
  const {user, saved} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    if(user){
        dispatch(getSaved({
            id: user?._id
        }))
    }
  },[user]) 
  
  return (
    <div className='home__container'>
        <Navbar />
        
        <div className='movie__lists'>
          <div style={{margin: '1.3rem'}} className='genre'>
              <h1 className='mylist__title'>My List</h1>
          </div>
          {
            saved.length === 0 ? <Unavailable message='List is empty' />
            : <div className='movielist__items'>
            {
                saved?.map(item => (
                    <MovieListItem key={item?.movieId} movie={item}  alreadySaved={true}/>
                ))
            }
          </div>
          }
        </div>
    </div>
  )
}

export default MyList