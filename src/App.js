import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { userSelect, fetchUser } from './store/userSlice'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'

// Views
import IssuesRoute from './routes/Issues'
import PullRequestsRoute from './routes/PullRequests'
import ReposRequestRoute from './routes/Repos'

import './App.css'

const { Content } = Layout

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelect)

  useEffect(() => {
    dispatch(fetchUser())
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <Router>
        <Nav user={user} />
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial', height: '100vh' }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              <Switch>
                <Route key="1" exact path="/">
                  <IssuesRoute />
                </Route>
                <Route key="2" path="/repos/:name">
                  <ReposRequestRoute />
                </Route>
                <Route key="3" exact path="/repos">
                  <ReposRequestRoute />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Router>
    </Layout>
  )
}

export default App
