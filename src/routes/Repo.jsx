import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { userSelect } from '../store/userSlice'
import { repoSelect, repoReadmeSelect, loadingSelect, fetchRepo } from '../store/repoSlice'
import Loader from '../components/Loader'

/**
 * repo properties
 * id (number)
 * name (string)
 * description (string)
 * fork (bool)
 * forks_count (number)
 * has_issues (bool)
 * issues_count (number)
 * has_projects (bool)
 * html_url (string)
 * private (bool)
 * stargazers_count (number)
 * subscribers_count (number)
 * updated_at (Date string)
 */


const Repo = () => {
  const dispatch = useDispatch()
  const repo = useSelector(repoSelect)
  const readme = useSelector(repoReadmeSelect)
  const user = useSelector(userSelect)
  const loading = useSelector(loadingSelect)

  const { name } = useParams()

  useEffect(() => {
    if (user) {
      dispatch(fetchRepo({ owner: user.login, repo: name}))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {(loading && !repo) && <Loader loaded={!loading} />}
      {(!loading && repo) && (
        <>
          <h1>{repo.name}</h1>
          <ReactMarkdown source={readme} />
        </>
      )}
    </div>
  )
}

export default Repo
