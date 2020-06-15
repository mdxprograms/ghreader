import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import issuesReducer from './issuesSlice'
import pullRequestsReducer from './pullRequestsSlice'
import reposReducer from './reposSlice'
import repoReducer from './repoSlice'
import notificationsReducer from './notificationsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  issues: issuesReducer,
  pullRequests: pullRequestsReducer,
  repos: reposReducer,
  repo: repoReducer,
  notifications: notificationsReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
