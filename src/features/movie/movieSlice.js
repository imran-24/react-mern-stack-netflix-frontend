import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieService from "./movieService";































export const getmovie = createAsyncThunk('movie/getmovie', async(data,thunkAPI) => {
    try{
        // const token = thunkAPI.getState().auth.user.token;
        return await movieService.getmovie(data);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const setmovie = createAsyncThunk('movie/setmovie', async(data,thunkAPI) => {
    try{
       

        const token = thunkAPI.getState().auth.user.token;
        //console.log(data);
       
        return await movieService.addmovie(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updatemovie = createAsyncThunk('movie/updatemovie', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        console.log(data);
        //console.log(data)
        return await movieService.updatemovie(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const likemovie = createAsyncThunk('movie/likemovie', async(data,thunkAPI) => {
    
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data)
        return await movieService.likemovie(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deletemovie = createAsyncThunk('movie/deletemovie', async(id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.deletemovie(id, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

const initialState = {
    memories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: false
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(setmovie.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setmovie.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories.push(action.payload)
        })
        .addCase(setmovie.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updatemovie.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updatemovie.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories = state.memories.map(movie => {
                if(movie?._id === action.payload?._id) return action.payload
                else{
                    return movie;
                }
            })
        })
        .addCase(updatemovie.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(likemovie.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(likemovie.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories = state.memories.map(movie => {
                if(movie?._id === action.payload?._id) return action.payload
                else{
                    return movie;
                }
            })
        })
        .addCase(likemovie.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getmovie.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getmovie.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories = (action.payload)
        })
        .addCase(getmovie.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message   = action.payload;
        })

        .addCase(deletemovie.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletemovie.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories.pop(action.payload)
        })
        .addCase(deletemovie.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

    }
})

export const {reset} = movieSlice.actions;
export default movieSlice.reducer;