import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  details: {},
  readme: "",
  loading: false,
  error: null,
}

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    getDetailsStart: state => {
      state.loading = true
      state.error = null
    },
    getDetailsSuccess: (state, action) => {
      state.details = action.payload.data
      state.loading = false
    },
    getDetailsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    getRepoReadmeSuccess: (state, action) => {
      state.readme = atob(action.payload.data.content)
    },
    getRepoReadmeFailure: (state, action) => {
      state.error = action.payload
    }
  },
})

// Selectors
export const repoSelect = ({ repo }) => repo.details
export const repoReadmeSelect = ({ repo }) => repo.readme
export const loadingSelect = ({ repo }) => repo.loading

export const {
  getDetailsStart,
  getDetailsSuccess,
  getDetailsFailure,
  getRepoReadmeSuccess,
  getRepoReadmeFailure
} = repoSlice.actions

// Thunks
export const fetchRepo = ({ owner, repo }) => async (dispatch, getState) => {
  try {
    dispatch(getDetailsStart())
    const details = await octokit.repos.get({ owner, repo })
    dispatch(getDetailsSuccess(details))
    dispatch(fetchRepoReadme({ owner, repo }))
  } catch (error) {
    dispatch(getDetailsFailure(error))
  }
}

export const fetchRepoReadme = ({ owner, repo }) => async dispatch => {
  try {
    const readme = await octokit.repos.getReadme({
      owner,
      repo,
    })
    dispatch(getRepoReadmeSuccess(readme))
  } catch (error) {
    dispatch(getRepoReadmeSuccess({ data: { content: btoa(`### Readme not found for ${repo}`)}}))
  }
}

export default repoSlice.reducer
