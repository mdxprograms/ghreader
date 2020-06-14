import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEqual } from 'lodash/fp'
import {
  reposSelect,
  loadingSelect,
  fetchRepos
} from '../store/reposSlice'
import { userSelect } from '../store/userSlice'
import ReposTable from '../components/ReposTable'
import Loader from '../components/Loader'

const Repos = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelect, isEqual)
  const repos = useSelector(reposSelect)
  const loading = useSelector(loadingSelect)

  useEffect(() => {
    dispatch(fetchRepos(user.login))
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {loading && <Loader loaded={!loading} />}
      {!loading && repos.length > 0 && <ReposTable repos={repos} />}
    </div>
  )
}

export default Repos
