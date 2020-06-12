import React from 'react'
import { Layout } from 'antd'
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchUser } from './store/userSlice'
// import Nav from './components/Nav'
// import Loader from './components/Loader'
import './App.css'

const { Content } = Layout

const App = () => {
  // const dispatch = useDispatch()
  // dispatch(fetchUser())
// <Nav user={user} setView={setView} />

  return (
    <Layout>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
                hello
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
