import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { issuesSelect, loadingSelect, fetchIssues } from '../store/issuesSlice'
import IssuesTable from '../components/IssuesTable'
import Loader from '../components/Loader'

function Issues () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIssues())
    // eslint-disable-next-line
  }, [])

  const issues = useSelector(issuesSelect)
  const loading = useSelector(loadingSelect)

  return (
    <div>
      {(loading && issues.length === 0) && <Loader loaded={!loading} />}
      {(!loading && issues.length > 0) && (
        <IssuesTable issues={issues} />
      )}
    </div>
  )
}

export default Issues
