import React, { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import { Layout, Table } from 'antd'
import Nav from './components/Nav'
import Loader from './components/Loader'
import './App.css'

const octokit = new Octokit({
  auth: process.env.REACT_APP_GH_TOKEN
})

const { Content } = Layout

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
        <Table dataSource={issues.map((issue, i) => { issue.key = issues[i]; return issue })} columns={issues.map((issue, i) => { issue.dataIndex = issues[i]; issue.key = issues[i]; return issue })} />
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
      {!loaded && <Loader loaded={loaded} />}
      {loaded &&
        <>
          <Nav user={user} setView={setView} />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="site-layout-background" style={{ padding: 24 }}>
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
