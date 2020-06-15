import React, { useEffect, useState } from 'react'
import { Layout, PageHeader, Drawer, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { userSelect, fetchUser, loadingSelect } from './store/userSlice'
import {
  notificationsSelect,
  fetchNotifications,
} from './store/notificationsSlice'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Loader from './components/Loader'
import Nav from './components/Nav'

// Views
import IssuesRoute from './routes/Issues'
import PullRequestsRoute from './routes/PullRequests'
import ReposRoute from './routes/Repos'
import RepoRoute from './routes/Repo'

import './App.css'

const { Content } = Layout

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(userSelect)
  const loading = useSelector(loadingSelect)
  const notifications = useSelector(notificationsSelect)

  useEffect(() => {
    dispatch(fetchUser())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications())
    }
  }, [dispatch, user])

  return (
    <Layout>
      <Router>
        {user && <Nav user={user} />}
        <Layout style={{ marginLeft: 200 }}>
          <Drawer
            onClose={() => setDrawerOpen(false)}
            title="Notifications"
            placement="right"
            closable
            visible={drawerOpen}
            width={600}
            bodyStyle={{ padding: 24 }}
          >
            {notifications.map(notification => (
              <h4 key={notification.id}>{notification.subject.title}</h4>
            ))}
          </Drawer>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Github Reader"
          >
            <Button type="primary" onClick={() => setDrawerOpen(!drawerOpen)}>
              Notifications
            </Button>
          </PageHeader>
          <Content
            style={{ overflow: 'initial', height: '100vh', padding: 24 }}
          >
            {loading && !user && <Loader loaded={loading} />}
            {!loading && user && (
              <Switch>
                <Route key="3" path="/repos">
                  <ReposRoute />
                </Route>
                <Route key="2" path="/repo/:name">
                  <RepoRoute />
                </Route>
                <Route key="1" exact path="/">
                  <IssuesRoute />
                </Route>
              </Switch>
            )}
          </Content>
        </Layout>
      </Router>
    </Layout>
  )
}

export default App
