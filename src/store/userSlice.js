import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  loading: false,
  details: {},
  error: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart (state) {
      state.loading = true
      state.error = null
    },
    getUserSuccess (state, action) {
      state.details = action.payload.data
      state.loading = false
      state.error = null
    },
    getUserFailure (state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure
} = user.actions

export default user.reducer

export const fetchUser = () => async dispatch => {
  try {
    dispatch(getUserStart())
    const userDetails = await octokit.users.getAuthenticated()
    dispatch(getUserSuccess(userDetails))
  } catch (error) {
    dispatch(getUserFailure(error))
  }
}
