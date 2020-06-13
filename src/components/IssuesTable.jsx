import React from 'react'
import { Table, Tag } from 'antd'
import PropTypes from 'prop-types'

const IssuesTable = ({ issues }) => { 
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

IssuesTable.propTypes = {
  issues: PropTypes.array
}

export default IssuesTable