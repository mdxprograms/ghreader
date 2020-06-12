import React, { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import { Layout, Skeleton } from 'antd'
import Nav from './components/Nav'
import './App.css'

const octokit = new Octokit({
  auth: process.env.REACT_APP_GH_TOKEN
})

const { Content } = Layout

/**
 * get users following -> octokit.users.listFollowedByAuthenticated();
 * get users followers -> octokit.users.listFollowersForAuthenticatedUser();
 * get issues assigned to user -> octokit.issues.list();
 * get gists owned by user -> octokit.gists.list();
 * get gist owned by user ->
 * octokit.gists.get({
 *   gist_id,
 * });
 * get notifications for user -> octokit.activity.listNotificationsForAuthenticatedUser();
 */

const Loader = ({ loaded }) =>
  <Skeleton loading={!loaded} style={{ height: '100vh' }} active>
    <div style={{ minHeight: '100vh' }}></div>
  </Skeleton>

const Issues = () => {
  const [loaded, setLoaded] = useState(false)
  const [issues, setIssues] = useState([])

  useEffect(() => {
    const fetchIssues = async () => {
      const { data } = await octokit.issues.list()
      setIssues(data)
      setLoaded(true)
    }

    fetchIssues()
  }, [])

  return (
    <div>
      {!loaded && <Loader loaded={loaded} /> }
      {loaded &&
        issues.map(issue => <p>{issue.title}</p>)
      }
    </div>
  )
}

function App () {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await octokit.users.getAuthenticated()
      setUser(data)
      setLoaded(true)
    }
    fetchUser()
  }, [])

  return (
    <Layout>
      <Loader loaded={loaded} />
      {loaded &&
        <>
          <Nav profileImg={user.avatar_url} setView={setView} />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="site-layout-background" style={{ padding: 24 }}>

                <h3>{user.name}</h3>
                <ul>
                  <li>Followers: {user.followers}</li>
                  <li>Following: {user.following}</li>
                  <li>Public Repos: {user.public_repos}</li>
                  <li>Private: {user.total_private_repos}</li>
                </ul>

                {view === 'issues' && <Issues />}
              </div>
            </Content>
          </Layout>
        </>
      }
    </Layout>
  )
}

export default App
