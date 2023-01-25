import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../../components/banner/Banner'
import MovieList from '../../components/movielist/MovieList'
import Navbar from '../../components/navbar/Navbar'
import requests, { getGenres } from '../../request'
import '../home/Home.scss'
const Home = () => {
  const {movies} = useSelector(state => state.netflix);

  return (
    <div className='home__container'>
        <Navbar />
        <Banner />
        <div style={{marginTop: '2rem'}} >
        <MovieList isLargeImage title='Netflix Originals' movies={movies.slice(0,10)}/>
        <MovieList title='Trending Now' movies={movies.slice(11,20)}/>
        <MovieList title='Top Rated' movies={movies.slice(21,30)}/>
        <MovieList title='Blockbuster Movies' movies={movies.slice(31,40)}/>
        <MovieList title='Popular onNetflix' movies={movies.slice(41,50)}/>
        <MovieList title='Action Movies' movies={movies.slice(51,60)}/>
        <MovieList title='Epics' movies={movies.slice(61,70)}/>
        </div>
    </div>
  )
}

export default Home