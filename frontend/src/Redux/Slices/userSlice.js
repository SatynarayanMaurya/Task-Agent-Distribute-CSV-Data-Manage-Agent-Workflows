import { createSlice } from '@reduxjs/toolkit'

const initialState = {


    loading:false,

    userDetails : null,

    allAgent : null,

    allTask : null

}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        setLoading:(state,action)=>{
            state.loading = action.payload
        },

        setUserDetails:(state,action)=>{
            state.userDetails = action.payload;
        },
        clearUserDetails:(state)=>{
            state.userDetails = null
        },

        setAllAgent:(state,action)=>{
            state.allAgent = action.payload;
        },
        clearAllAgent:(state)=>{
            state.allAgent = null
        },

        setAllTask:(state,action)=>{
            state.allTask = action.payload;
        },
        clearAllTask:(state)=>{
            state.allTask = null
        },


    }
})

export const {setLoading, setUserDetails, clearUserDetails, setAllAgent,clearAllAgent, setAllTask,clearAllTask} = userSlice.actions
export default userSlice.reducer