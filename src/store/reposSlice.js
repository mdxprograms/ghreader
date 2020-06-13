import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  currentRepo: null,
  list: [],
  loading: false,
  error: null
}

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    getCurrentRepoStart: (state) => {
      state.loading = true
      state.error = null
    },
    getCurrentRepoSuccess: (state, action) => {
      state.currentRepo = action.payload.data
      state.loading = false
    },
    getCurrentRepoFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
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
export const currentRepoSelect = ({ repos }) => repos.currentRepo
export const loadingSelect = ({ repos }) => repos.loading

export const {
  getReposStart,
  getReposSuccess,
  getReposFailure,
  getCurrentRepoStart,
  getCurrentRepoSuccess,
  getCurrentRepoFailure
} = reposSlice.actions

// Thunks
export const fetchRepos = () => async dispatch => {
  try {
    dispatch(getReposStart())
    const reposList = await octokit.repos.listForAuthenticatedUser({ sort: 'updated', per_page: 50 })
    dispatch(getReposSuccess(reposList))
  } catch (error) {
    dispatch(getReposFailure(error))
  }
}

export const fetchRepo = ({ owner, repo }) => async dispatch => {
  try {
    dispatch(getCurrentRepoStart())
    const currentRepo = await octokit.repos.get({ owner, repo })
    dispatch(getCurrentRepoSuccess(currentRepo))
  } catch (error) {
    dispatch(getCurrentRepoFailure(error))
  }
}

export default reposSlice.reducer
