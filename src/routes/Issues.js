import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Table, ColumnGroup } from 'antd'
import { issuesSelect, loadingSelect, fetchIssues } from '../store/issuesSlice'
import Loader from '../components/Loader'

const IssueTable = ({ issues }) => { 
  const issuesData = issues.map(issue => ({
    key: issue.id,
    title: issue.title,
    ghLink: issue.html_url,
    state: issue.state
  }))
  const issuesColumns = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Title'
    },
    {
      key: 'ghLink',
      dataIndex: 'ghLink',
      title: 'Github url'
    },
    {
      key: 'state',
      dataIndex: 'state',
      title: 'Issue Status'
    }
  ]
  return <Table dataSource={issues} columns={issuesColumns} />
}

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
        <IssueTable issues={issues} />
      )}
    </div>
  )
}

export default Issues
