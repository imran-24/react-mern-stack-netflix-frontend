import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../../request";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: []
};

export const getGenres = createAsyncThunk('netflix/getGenres', async()=>{
    const {data: {genres}} =  await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return genres;
})

const creteArrayFromRawData =(array, moviesArray, genres)=>{
    array.forEach(movie =>{
        const movieGenres = [];
        movie.genre_ids.forEach(genre => {
            const name = genres.find(({id})=> id === genre);
            if(name) movieGenres.push(name.name)
        }) 
        if(movie.backdrop_path || movie.poster_path){
            moviesArray.push(movie)
        }
    })
}

const getRawData = async(api, genres, paging)=> {
    const movieArray = [];
    for(let i = 1; movieArray.length < 70 && i < 10; ++i ){
       const {data: {results} } =  await axios.get(`${api}${paging? `&page=${i}` : ''}`)
       
       creteArrayFromRawData(results, movieArray, genres);
    }
    return movieArray;
}

export const fetchMoviesByGenre = createAsyncThunk('netflix/fetchMoviesByGenre', async({genre, type},thunkAPI)=>{
    const {netflix: {genres}} = thunkAPI.getState();
    console.log(type)
    return  getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres )
    
})

export const fetchMovies = createAsyncThunk('netflix/getMovies', async({type},thunkAPI)=>{
    const {netflix: {genres}} = thunkAPI.getState();
    return  getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true )
    
})

const netflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers:(builder) => {
        builder
        .addCase(getGenres.fulfilled, (state, action) =>{
            state.genres = (action.payload)
            state.genresLoaded = true;
        })
        .addCase(fetchMovies.fulfilled, (state, action) =>{
            state.movies = (action.payload)
        })
        .addCase(fetchMoviesByGenre.fulfilled, (state, action) =>{
            state.movies = (action.payload)
        })
    }
})

export default netflixSlice.reducer;