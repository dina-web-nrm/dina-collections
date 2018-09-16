import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import { createModuleTranslate } from 'coreModules/i18n/components'
import IdentifiersTableRow from './Row'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIdentifiers:IdentifiersTable'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    identifiers: formValueSelector(state, 'individual.identifiers'),
    identifierTypeOptions: globalCrudSelectors.identifierType
      .getAllAsOptions(state)
      .filter(option => {
        return option.text !== 'Catalog number'
      }),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  identifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  identifierTypeOptions: PropTypes.array.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

function IdentifiersTable({
  changeFieldValue,
  getPath,
  identifiers,
  identifierTypeOptions,
  removeArrayFieldByIndex,
}) {
  if (!identifiers.length) {
    return null
  }

  log.render()
  return (
    <React.Fragment>
      <Grid.Column width={16}>
        {`Catalog number: ${identifiers[0].value}`}
      </Grid.Column>
      {identifiers
        // TODO fix this and check for the value. Cant trust the order
        .slice(1) // skip first as that is the catalog number
        .map((identifier, index) => {
          return (
            <Grid.Column width={16}>
              <IdentifiersTableRow
                changeFieldValue={changeFieldValue}
                identifier={identifier}
                identifierTypeOptions={identifierTypeOptions}
                index={index + 1}
                key={index + 1} // eslint-disable-line react/no-array-index-key
                removeArrayFieldByIndex={removeArrayFieldByIndex}
              />
            </Grid.Column>
          )
        })
        .filter(item => !!item)}
      <Grid.Column width={16}>
        <Button
          basic
          className="shadowless"
          color="blue"
          id="add-identifier"
          onClick={event => {
            event.preventDefault()
            changeFieldValue(getPath(identifiers.length), {})
          }}
        >
          + <ModuleTranslate capitalize textKey="other.addIdentifier" />
        </Button>
      </Grid.Column>
    </React.Fragment>
  )
}

IdentifiersTable.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({ resource: 'identifierType' }),
  connect(mapStateToProps),
  pathBuilder({ name: 'individual.identifiers' })
)(IdentifiersTable)
