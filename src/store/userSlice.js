import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  loading: false,
  details: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart: state => {
      state.loading = true
      state.error = null
    },
    getUserSuccess: (state, action) => {
      state.details = action.payload
      state.loading = false
      state.error = null
    },
    getUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

// Selectors
export const userSelect = state => state.user.details
export const loadingSelect = state => state.loading

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions

// thunks
export const fetchUser = () => async dispatch => {
  dispatch(getUserStart())
  if (!localStorage.getItem('ghreaderUser')) {
    octokit.users
      .getAuthenticated()
      .then(response => {
        localStorage.setItem('ghreaderUser', JSON.stringify(response.data))
        dispatch(getUserSuccess(response.data))
      })
      .catch(error => dispatch(getUserFailure(error)))
  } else {
    dispatch(getUserSuccess(JSON.parse(localStorage.getItem('ghreaderUser'))))
  }
}

export default userSlice.reducer
