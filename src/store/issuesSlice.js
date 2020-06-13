import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  list: [],
  loading: false,
  error: null
}

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    getIssuesStart: (state) => {
      state.loading = true
      state.error = null
    },
    getIssuesSuccess: (state, action) => {
      state.list = action.payload.data
      state.loading = false
      state.error = null
    },
    getIssuesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

// Selectors
export const issuesSelect = ({ issues }) => issues.list
export const loadingSelect = ({ issues }) => issues.loading

export const {
  getIssuesStart,
  getIssuesSuccess,
  getIssuesFailure
} = issuesSlice.actions

// Thunks
export const fetchIssues = () => async dispatch => {
  try {
    dispatch(getIssuesStart())
    const issuesList = await octokit.issues.listForAuthenticatedUser()
    dispatch(getIssuesSuccess(issuesList))
  } catch (error) {
    dispatch(getIssuesFailure(error))
  }
}

export default issuesSlice.reducer
