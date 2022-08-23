import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


type User = {
    id:number,
    name:string
}

type InitialState = {
    loading:boolean,
    users:User[],
    error:string
}

const initialState:InitialState = {
    loading:false,
    users:[],
    error:''
}

export const fetchUsers = createAsyncThunk('user/fetchUser',() => {
    return axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data)
})

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending,(state) => {
            state.loading = true;
        }),
        builder.addCase(fetchUsers.fulfilled,(state,action:PayloadAction<Array<any>>) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        }),
        builder.addCase(fetchUsers.rejected,(state,action) => {
                state.loading = false;
                state.users = [];
                state.error = action.error.message || 'error something went wrong'
        })
    },
})

export default userSlice.reducer
