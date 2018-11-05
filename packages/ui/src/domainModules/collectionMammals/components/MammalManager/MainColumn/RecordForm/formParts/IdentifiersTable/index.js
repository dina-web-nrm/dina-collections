import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import formParts from 'coreModules/form/components/parts'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { globalSelectors as crudKeyObjectSelectors } from 'coreModules/crud/keyObjectModule'
import IdentifiersTableRow from './Row'

const { AddButton } = formParts

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/FormRow/formParts/IdentifiersTable'
)

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    allIdentifierTypesFetched: crudKeyObjectSelectors.get[
      ':resource.allItemsFetched'
    ](state, { resource: 'identifierType' }),
    identifiers: formValueSelector(state, name),
    identifierTypeOptions: globalCrudSelectors.identifierType
      .getAllAsOptions(state)
      .filter(option => {
        return option.text !== 'Catalog number'
      }),
  }
}

const propTypes = {
  allIdentifierTypesFetched: PropTypes.bool,
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  identifiers: PropTypes.arrayOf(PropTypes.object),
  identifierTypeOptions: PropTypes.array.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  allIdentifierTypesFetched: false,
  identifiers: [],
}

function IdentifiersTable({
  allIdentifierTypesFetched,
  changeFieldValue,
  getPath,
  identifiers,
  identifierTypeOptions,
  removeArrayFieldByIndex,
}) {
  if (!identifiers.length || !allIdentifierTypesFetched) {
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
      />
    </React.Fragment>
  )
}

IdentifiersTable.propTypes = propTypes
IdentifiersTable.defaultProps = defaultProps

export default compose(connect(mapStateToProps), pathBuilder())(
  IdentifiersTable
)
