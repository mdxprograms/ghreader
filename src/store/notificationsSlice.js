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
    getMarkAllAsReadStart: (state) => {
      state.loading = true
      state.error = null
    },
    getMarkAllAsReadSuccess: (state, action) => {
      state.list = []
      state.error = null
    },
    getMarkAllAsReadFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
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
  getNotificationsFailure,
  getMarkAllAsReadStart,
  getMarkAllAsReadSuccess,
  getMarkAllAsReadFailure
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

export const markAllAsRead = () => async (dispatch) => {
  try {
    dispatch(getMarkAllAsReadStart())
    const success = await octokit.activity.markNotificationsAsRead()
    dispatch(getMarkAllAsReadSuccess(success))
  } catch (error) {
    dispatch(getMarkAllAsReadFailure(error))
  }
}

export default notificationsSlice.reducer
