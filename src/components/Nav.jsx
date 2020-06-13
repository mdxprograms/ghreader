import React from 'react'
import { Layout, Menu, Avatar, Typography, Badge } from 'antd'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const { Sider } = Layout
const { Title, Text } = Typography

const badgeStyle = {
  background: 'lightblue',
  border: 'none',
  boxShadow: '0 0 5px #000',
  color: '#555',
  marginLeft: '16px'
}

const headingStyle = {
  color: 'lightblue'
}

const Nav = ({ user }) => (
  <Sider style={{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0
  }}>
    <div style={{ margin: '24px auto', width: '60%', textAlign: 'center' }} >
      <Avatar size={72} src={user.avatar_url} />
      <Title level={4}>
        <Text style={headingStyle}>{user.name}</Text>
      </Title>
      <a href={user.html_url} target='_blank' rel="noopener noreferrer">@{user.login}</a>
    </div>
    <Menu theme="dark" mode="vertical-left" defaultSelectedKeys={['/']}>
      <Menu.Item key="/">
        <NavLink  to="/" className="nav-text">Issues</NavLink>
      </Menu.Item>
      <Menu.Item key="/repos">
        <NavLink  to="/repos" className="nav-text">Repos</NavLink>
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
  })
}

export default Nav
