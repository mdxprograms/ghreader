import React from 'react'
import { Layout, Menu, Avatar } from 'antd'
import PropTypes from 'prop-types'

const { Sider } = Layout

const Nav = ({ user, setView }) => (
  <Sider style={{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0
  }}>
    <div style={{ margin: '24px auto', width: '50%', textAlign: 'center' }} >
      <Avatar size={72} src={user.avatar_url} />
      <h3 color='secondary'>{user.name}</h3>
      <a href={user.html_url} target='_blank' rel="noopener noreferrer">@{user.login}</a>
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
        Followers {user.followers}
      </Menu.Item>
      <Menu.Item onClick={() => setView('following')} key="5">
        Following {user.following}
      </Menu.Item>
      <Menu.Item>
        Public Repos {user.public_repos}
      </Menu.Item>
      <Menu.Item>
        Private Repos {user.total_private_repos}
      </Menu.Item>
    </Menu>
  </Sider>
)

Nav.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    html_url: PropTypes.string,
    public_repos: PropTypes.number,
    total_private_repos: PropTypes.number,
    login: PropTypes.string
  }),
  setView: PropTypes.func
}

export default Nav
