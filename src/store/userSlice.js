import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  loading: false,
  details: {},
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    getUserSuccess: (state, action) => {
      state.details = action.payload.data
      state.loading = false
      state.error = null
    },
    getUserFailure: (state, action) => {
      console.log('error')
      state.loading = false
      state.error = action.payload
    }
  }
})

// Selectors
export const userSelect = (state) => state.user.details
export const loadingSelect = (state) => state.loading

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure
} = userSlice.actions

// thunks
export const fetchUser = () => async (dispatch, getState) => {
  try {
    dispatch(getUserStart())
    const userDetails = await octokit.users.getAuthenticated()
    dispatch(getUserSuccess(userDetails))
  } catch (error) {
    dispatch(getUserFailure(error))
  }
}

export default userSlice.reducer
