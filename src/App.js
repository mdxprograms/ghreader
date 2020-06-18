import React, { useEffect, useState } from 'react'
import { Layout, PageHeader, Drawer, Button, Typography, Tag, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// electron
import { channels } from './shared/constants'

// Stores
import { userSelect, fetchUser, loadingSelect } from './store/userSlice'
import {
  notificationsSelect,
  fetchNotifications,
} from './store/notificationsSlice'

// Components
import Loader from './components/Loader'
import Nav from './components/Nav'

// Views
import IssuesRoute from './routes/Issues'
import PullRequestsRoute from './routes/PullRequests'
import ReposRoute from './routes/Repos'
import RepoRoute from './routes/Repo'

// Base style
import './App.css'

// intialized constants
const { ipcRenderer } = window.require('electron')
const { Content } = Layout
const { Title } = Typography

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [appName, setAppName] = useState("")
  const [appVersion, setAppVersion] = useState("")
  const [hasToken, setHasToken] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(userSelect)
  const loading = useSelector(loadingSelect)
  const notifications = useSelector(notificationsSelect)

  useEffect(() => {
    ipcRenderer.send(channels.APP_INFO)
    ipcRenderer.send(channels.USER_TOKEN_CHECK)

    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO)
      setAppName(arg.appName)
      setAppVersion(arg.appVersion)
    })
    ipcRenderer.on(channels.USER_TOKEN_CHECK, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.USER_TOKEN_CHECK)
      setHasToken(arg.hasToken)
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (hasToken) {
      dispatch(fetchUser())
    }
    // eslint-disable-next-line
  }, [hasToken])

  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications())
    }
    // eslint-disable-next-line
  }, [user])

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
            extra={[
              <Space>
                <Title level={4} key="1">{appName}</Title>
                <Tag key="2">
                  v{appVersion}
                </Tag>
              </Space>
            ]}
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
