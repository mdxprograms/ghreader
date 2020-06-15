import { createSlice } from '@reduxjs/toolkit'
import { octokit } from '../config'

const initialState = {
  list: [],
  loading: false,
  error: null
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotificationsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getNotificationsSuccess: (state, action) => {
      state.list = action.payload.data
      state.loading = false
      state.error = null
    },
    getNotificationsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

// Selectors
export const notificationsSelect = ({ notifications }) => notifications.list
export const loadingSelect = ({ notifications }) => notifications.loading

export const {
  getNotificationsStart,
  getNotificationsSuccess,
  getNotificationsFailure
} = notificationsSlice.actions

// Thunks
export const fetchNotifications = () => async (dispatch) => {
  try {
    dispatch(getNotificationsStart())
    const notificationsList = await octokit.activity.listNotificationsForAuthenticatedUser()
    dispatch(getNotificationsSuccess(notificationsList))
  } catch (error) {
    dispatch(getNotificationsFailure(error))
  }
}

export default notificationsSlice.reducer
