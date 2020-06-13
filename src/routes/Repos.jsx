import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { Table, Tag } from 'antd'
import { isEqual } from 'lodash/fp'
import { currentRepoSelect, reposSelect, loadingSelect, fetchRepo, fetchRepos } from '../store/reposSlice'
import { userSelect } from '../store/userSlice'
import Loader from '../components/Loader'

const ReposTable = ({ repos }) => {
  const reposData = repos.map(({ id, name, html_url, stargazers_count, open_issues }) => ({
    key: id,
    nameAndLink: {
      name,
      link: `/repos/${name}`
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

// @TODO: Break this into separate routes
const Repos = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelect, isEqual)
  const currentRepo = useSelector(currentRepoSelect)
  const repos = useSelector(reposSelect)
  const loading = useSelector(loadingSelect)

  const { name } = useParams()

  useEffect(() => {
    if (name) {
      dispatch(fetchRepo({ owner: user.login, repo: name}))
    } else {
      dispatch(fetchRepos(user.login))
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <div>
      {loading && <Loader loaded={!loading} />}
      {(!loading && currentRepo) && (
        <h1>{currentRepo.name}</h1>
      )}
      {(!loading && repos.length > 0) && (
        <ReposTable repos={repos} />
      )}
    </div>
  )
}

export default Repos
