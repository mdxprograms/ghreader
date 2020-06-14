import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'

const ReposTable = ({ repos }) => {
  const reposData = repos.map(({ id, name, html_url, stargazers_count, open_issues }) => ({
    key: id,
    nameAndLink: {
      name,
      link: `/repo/${name}`
    },
    stars: stargazers_count,
    openIssues: open_issues
  }))

  const reposColumns = [
    {
      key: 'nameAndLink',
      dataIndex: 'nameAndLink',
      title: 'Repo',
      render: ({ name, link}) => (
        <NavLink to={link}>{name}</NavLink>
      )
    },
    {
      key: 'stars',
      dataIndex: 'stars',
      title: 'Starred #',
      render: stars => {
        const color = stars === 0 ? "#cb2431" : "#2cbe4e" 
        return <Tag color={color}>{stars}</Tag>
      }
    },
    {
      key: 'openIssues',
      dataIndex: 'openIssues',
      title: 'Issues #'
    }
  ]

  return <Table dataSource={reposData} columns={reposColumns} />
}

ReposTable.propTypes = {
  repos: PropTypes.array
}

export default ReposTable