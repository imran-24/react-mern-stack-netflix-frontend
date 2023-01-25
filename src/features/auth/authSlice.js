import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    saved:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const signup = createAsyncThunk('auth/signup', async(user, thunkAPI) => {
    try{
        
        return await authService.signup(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const signin = createAsyncThunk('auth/signin', async(user, thunkAPI) => {
    try{
        return await authService.login(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const add = createAsyncThunk('auth/add', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await authService.add(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const remove = createAsyncThunk('auth/remove', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await authService.remove(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getSaved = createAsyncThunk('auth/getSaved', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await authService.getSaved(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async(thunkAPI) => {
    try{
        return await authService.logout();
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const userstats = createAsyncThunk('auth/userstats', async(thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await authService.userstats(token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading= false;
            state.isSuccess= false;
            state.isError= false;
            state.message= ''
        }
    },
    extraReducers:(builder) => { 
        builder
        .addCase(signup.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signup.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            state.user = null
        })
        .addCase(getSaved.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(getSaved.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.saved = action.payload
        })
        .addCase(getSaved.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            
        })

        .addCase(add.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(add.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.saved.push(action.payload)
        })
        .addCase(add.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            
        })

        .addCase(remove.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(remove.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.saved = state.saved.filter(item => item?.movieId !== action.payload?.movieId)
        })
        .addCase(remove.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            
        })
    
        .addCase(signin.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signin.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.user = null
        })
        .addCase(userstats.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(userstats.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(userstats.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            state.user = null
        })
        
    }
}) 

export const {reset } = authSlice.actions;
export default authSlice.reducer;