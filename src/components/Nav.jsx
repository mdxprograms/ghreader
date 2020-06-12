import React from 'react'
import { Layout, Menu, Avatar } from 'antd'

const { Sider } = Layout

const Nav = ({ profileImg = '', setView }) => (
  <Sider style={{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0
  }}>
    <div style={{ margin: '24px auto', width: '50%', textAlign: 'center' }} >
      <Avatar size={72} src={profileImg} />
    </div>
    <Menu theme="dark" mode="vertical-left">
      <Menu.Item onClick={() => setView('issues')} key="1">
        Issues
      </Menu.Item>
      <Menu.Item onClick={() => setView('pulls')} key="2">
        Pull Requests
      </Menu.Item>
      <Menu.Item onClick={() => setView('notifications')} key="3">
        Notifications
      </Menu.Item>
      <Menu.Item onClick={() => setView('followers')} key="4">
        Followers
      </Menu.Item>
      <Menu.Item onClick={() => setView('following')} key="5">
        Following
      </Menu.Item>
    </Menu>
  </Sider>
)

export default Nav
