import React, { useEffect, useState } from 'react'
import '../movielist/MovieList.scss'
import MovieListItem from '../movielistitem/MovieListItem'
import requests from '../../request';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axios';
import { setmovie } from '../../features/movie/movieSlice';

const MovieList = ({title, movies, isLargeImage}) => {
    
  return (
    <div className='movielist__container'>
        <p>continue to watch {title}</p>
        <div className='movielist__items'>
          {
            movies?.map(movie => (
              <MovieListItem key={movie.id} movie={movie} isLargeImage={isLargeImage} />
            ))
          }
        </div>
    </div>
  )
}

export default MovieList