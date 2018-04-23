import React from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Segment } from 'semantic-ui-react'

const propTypes = {
  error: PropTypes.object,
}

const defaultProps = {
  error: null,
}

const DefaultLoadingError = ({ error }) => {
  return (
    <Container>
      <Header style={{ marginTop: 50 }}>Loading error</Header>
      <p>
        There was an error loading a module. Likely due to a new version.
        <span style={{ fontWeight: 'bold' }}> Try and reload the page.</span>
      </p>

      <Header sub>Error details</Header>
      {error && (
        <Segment color="red">
          <p>Message: {error.message}</p>
          <p>Stack: {error.stack}</p>
          <p>Error object: {JSON.stringify(error, null, 2)}</p>
        </Segment>
      )}
    </Container>
  )
}

DefaultLoadingError.propTypes = propTypes
DefaultLoadingError.defaultProps = defaultProps

export default DefaultLoadingError
