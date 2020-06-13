import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  list: [],
  loading: false,
  error: null
}

const pullRequestsSlice = createSlice({
  name: 'pullRequests',
  initialState,
  reducers: {
    getPullRequestsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getPullRequestsSuccess: (state, action) => {
      state.list = action.payload.data
      state.loading = false
      state.error = null
    },
    getPullRequestsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

// Selectors
export const pullRequestsSelect = ({ pullRequests }) => pullRequests.list
export const loadingSelect = ({ pullRequests }) => pullRequests.loading

export const {
  getPullRequestsStart,
  getPullRequestsSuccess,
  getPullRequestsFailure
} = pullRequestsSlice.actions

// Thunks
export const fetchPullRequests = (owner, repo) => async (dispatch) => {
  try {
    dispatch(getPullRequestsStart())
    const pullRequestsList = await octokit.pulls.list({
      owner,
      repo
    })
    console.log(pullRequestsList)
    dispatch(getPullRequestsSuccess(pullRequestsList))
  } catch (error) {
    dispatch(getPullRequestsFailure(error))
  }
}

export default pullRequestsSlice.reducer
