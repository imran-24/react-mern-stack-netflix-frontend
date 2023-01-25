import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Unavailable from '../../components/unavailable/Unavailable'
import MovieList from '../../components/movielist/MovieList'
import Navbar from '../../components/navbar/Navbar'
import { fetchMoviesByGenre, getGenres } from '../../features/movie/netflixSlice'
import '../home/Home.scss'
const Movies = () => {
    
    const genresLoaded = useSelector(state => state.netflix.genresLoaded);
    const dispatch = useDispatch();
    const {genres} = useSelector((state) => state.netflix);
    const [genre, setGenre] = useState(28);
    const type = useParams();
    const navigate = useNavigate();
    const {movies} = useSelector(state => state.netflix);
    useEffect(()=>{
      dispatch(getGenres())
    },[navigate])
    useEffect(()=>{
      if(genresLoaded) dispatch(fetchMoviesByGenre({genre, type : type?.type }))
    },[genres, genre])

  return (
    <div className='home__container'>
        <Navbar />
        
        <div className='movie__lists'>
          <div style={{margin: '1.3rem'}} className='genre'>
              {/* <label style={{color: 'white', paddingRight: 10, fontSize: 18}}>Movie</label> */}
              <select onChange={(e)=> setGenre(e.target.value)}  name="genre" style={{padding: 8, color: 'white', border: '1px solid white',outline: 'none', backgroundColor: 'transparent',  }}>
                  {
                      genres.map(item => (
                          <option style={{ color: 'black' }}   className='option'  key={item?.id} value={item?.id}>{item?.name}</option> 
                      ))
                  }
              </select>
          </div>
          {
            movies.length === 0 ? <Unavailable message='Not Available'/> :
            <>
            <MovieList isLargeImage title='Netflix Originals' movies={movies.slice(0,10)}/>
            <MovieList title='Trending Now' movies={movies.slice(11,20)}/>
            <MovieList title='Top Rated' movies={movies.slice(21,30)}/>
            <MovieList title='Blockbuster Movies' movies={movies.slice(31,40)}/>
            <MovieList title='Popular onNetflix' movies={movies.slice(41,50)}/>
            <MovieList title='Action Movies' movies={movies.slice(51,60)}/>
            <MovieList title='Epics' movies={movies.slice(61,70)}/>
            </>
          }
        </div>
    </div>
  )
}

export default Movies