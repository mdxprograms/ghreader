import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { issuesSelect, loadingSelect, fetchIssues } from '../store/issuesSlice'
import Loader from '../components/Loader'

const Issues = () => {
  const dispatch = useDispatch()
  const issues = useSelector(issuesSelect)
  const loading = useSelector(loadingSelect)

  useEffect(() => {
    dispatch(fetchIssues())
  }, [dispatch])

  return (
    <div>
      {loading && <Loader loaded={!loading} />}
      {!loading && issues && (
        issues.map(issue => <p key={issue.id}>{issue.title}</p>)
      )}
    </div>
  )
}

export default Issues
