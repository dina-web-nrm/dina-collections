import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Table } from 'semantic-ui-react'
import { arrayPush as arrayPushAC } from 'redux-form'
import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapDispatchToProps = {
  arrayPush: arrayPushAC,
}

const propTypes = {
  arrayPush: PropTypes.func.isRequired,
}

const Footer = ({ arrayPush }) => {
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell colSpan="5">
          <Button
            id="add-feature-observation"
            onClick={event => {
              event.preventDefault()
              arrayPush('mammalForm', 'featureObservations', {})
            }}
            size="small"
          >
            <ModuleTranslate textKey="add" />
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

Footer.propTypes = propTypes

export default compose(connect(undefined, mapDispatchToProps))(Footer)
