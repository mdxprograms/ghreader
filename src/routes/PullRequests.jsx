import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { pullRequestsSelect, loadingSelect, fetchPullRequests } from '../store/pullRequestsSlice'
import { userSelect } from '../store/userSlice'
import Loader from '../components/Loader'

const PullRequests = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelect)

  useEffect(() => {
    dispatch(fetchPullRequests(user.login, 'fastic'))
    // eslint-disable-next-line
  }, [user])

  const pullRequests = useSelector(pullRequestsSelect)
  const loading = useSelector(loadingSelect)

  return (
    <div>
      {(loading && pullRequests.length === 0) && <Loader loaded={!loading} />}
      {(!loading && pullRequests.length > 0) && (
        <h1>Hello PRs</h1>
      )}
    </div>
  )
}

export default PullRequests
