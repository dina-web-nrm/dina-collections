import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node,
  container: PropTypes.bool,
  fullViewHeight: PropTypes.bool,
}
const defaultProps = {
  children: null,
  container: true,
  fullViewHeight: false,
}

const PageTemplate = ({ children, container, fullViewHeight }) => {
  if (container) {
    return (
      <Container
        style={{
          minHeight: fullViewHeight ? '100vh' : undefined,
          paddingBottom: 30,
          paddingTop: 30,
        }}
      >
        {children}
      </Container>
    )
  }
  return (
    <div
      style={{
        minHeight: fullViewHeight ? '100vh' : undefined,
        padding: 20,
        paddingTop: 20,
      }}
    >
      {children}
    </div>
  )
}

PageTemplate.propTypes = propTypes
PageTemplate.defaultProps = defaultProps

export default PageTemplate
