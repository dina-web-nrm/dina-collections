import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node.isRequired,
  hasFixedMenu: PropTypes.bool,
}
const defaultProps = {
  hasFixedMenu: false,
}

const PageTemplate = ({ hasFixedMenu, children }) => {
  return (
    <Container
      style={{
        minHeight: '100vh',
        paddingBottom: 30,
        paddingTop: hasFixedMenu ? 61.5 : 30,
      }}
    >
      {children}
    </Container>
  )
}

PageTemplate.propTypes = propTypes
PageTemplate.defaultProps = defaultProps

export default PageTemplate
