import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import issuesReducer from './issuesSlice'

const rootReducer = combineReducers({
  user: userReducer,
  issues: issuesReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
