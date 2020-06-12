import React from 'react'
import { Skeleton } from 'antd'
import PropTypes from 'prop-types'

const Loader = ({ loaded = false }) =>
  <Skeleton loading={!loaded} style={{ height: '100vh' }} active>
    <div style={{ minHeight: '100vh' }}></div>
  </Skeleton>

Loader.propTypes = {
  loaded: PropTypes.bool
}

export default Loader
