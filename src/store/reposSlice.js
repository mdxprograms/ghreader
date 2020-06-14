import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  list: [],
  loading: false,
  error: null
}

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    getReposStart: (state) => {
      state.loading = true
      state.error = null
    },
    getReposSuccess: (state, action) => {
      state.list = action.payload.data
      state.loading = false
      state.error = null
    },
    getReposFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

// Selectors
export const reposSelect = ({ repos }) => repos.list
export const loadingSelect = ({ repos }) => repos.loading

export const {
  getReposStart,
  getReposSuccess,
  getReposFailure
} = reposSlice.actions

// Thunks
export const fetchRepos = () => async (dispatch, getState) => {
  if (getState().repos.list.length === 0) {
    try {
      dispatch(getReposStart())
      const reposList = await octokit.repos.listForAuthenticatedUser({ sort: 'updated', per_page: 50, type: 'all' })
      dispatch(getReposSuccess(reposList))
    } catch (error) {
      dispatch(getReposFailure(error))
    }
  }
}

export default reposSlice.reducer
