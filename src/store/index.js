import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import issuesReducer from './issuesSlice'
import pullRequestsReducer from './pullRequestsSlice'
import reposReducer from './reposSlice'

const rootReducer = combineReducers({
  user: userReducer,
  issues: issuesReducer,
  pullRequests: pullRequestsReducer,
  repos: reposReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
