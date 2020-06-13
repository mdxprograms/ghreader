import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag } from 'antd'
import { issuesSelect, loadingSelect, fetchIssues } from '../store/issuesSlice'
import Loader from '../components/Loader'

const IssueTable = ({ issues }) => { 
  const issuesData = issues.map(issue => ({
    key: issue.id,
    titleAndLink: {
      title: issue.title,
      link: issue.html_url
    },
    state: issue.state
  }))
  const issuesColumns = [
    {
      key: 'titleAndLink',
      dataIndex: 'titleAndLink',
      title: 'Issue',
      render: ({ title, link}) => (
        <a target="_blank" href={link} rel="noopener noreferrer">{title}</a>
      )
    },
    {
      key: 'state',
      dataIndex: 'state',
      title: 'Status',
      render: state => {
        const color = state === "open" ? "#2cbe4e" : "#cb2431"
        return <Tag color={color}>{state}</Tag>
      }
    }
  ]
  return <Table dataSource={issuesData} columns={issuesColumns} />
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
