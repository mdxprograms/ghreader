import React from 'react'
import { Skeleton } from 'antd'
import PropTypes from 'prop-types'

const Loader = ({ loaded }) =>
  <Skeleton loading={!loaded} paragraph={{ rows: 25 }} active />

Loader.propTypes = {
  loaded: PropTypes.bool
}

export default Loader
