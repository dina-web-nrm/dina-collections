import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import IdentifiersTableRow from './Row'
import AddButton from '../../StaticContent/AddButton'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIdentifiers:IdentifiersTable'
)

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    identifiers: formValueSelector(state, name),
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
      {identifiers[0].value && (
        <Grid.Column width={16}>
          {`Catalog number: ${identifiers[0].value}`}
        </Grid.Column>
      )}
      {// TODO fix this and check for the value. Cant trust the order
      identifiers
        .slice(1) // skip first as that is the catalog number
        .map((identifier, index) => {
          return (
            <Grid.Column
              key={index} // eslint-disable-line react/no-array-index-key
              width={16}
            >
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
      <AddButton
        id="add-identifier"
        onClick={event => {
          event.preventDefault()
          changeFieldValue(getPath(identifiers.length), {})
        }}
        textKey="other.addIdentifier"
        width={16}
      />
    </React.Fragment>
  )
}

IdentifiersTable.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({ resource: 'identifierType' }),
  connect(mapStateToProps),
  pathBuilder()
)(IdentifiersTable)
