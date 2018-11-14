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
import CustomTaxonNamesTableRow from './Row'

const { AddButton } = formParts

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/formParts/CustomTaxonNamesTable'
)

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    allCustomTaxonNameTypesFetched: crudKeyObjectSelectors.get[
      ':resource.allItemsFetched'
    ](state, { resource: 'customTaxonNameType' }),
    customTaxonNames: formValueSelector(state, name),
    customTaxonNameTypeOptions: globalCrudSelectors.customTaxonNameType.getAllAsOptions(
      state
    ),
  }
}

const propTypes = {
  allCustomTaxonNameTypesFetched: PropTypes.bool,
  changeFieldValue: PropTypes.func.isRequired,
  customTaxonNames: PropTypes.arrayOf(PropTypes.object),
  customTaxonNameTypeOptions: PropTypes.array.isRequired,
  getPath: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  allCustomTaxonNameTypesFetched: false,
  customTaxonNames: [],
}

function CustomTaxonNamesTable({
  allCustomTaxonNameTypesFetched,
  changeFieldValue,
  getPath,
  customTaxonNames,
  customTaxonNameTypeOptions,
  removeArrayFieldByIndex,
}) {
  log.render()
  if (!allCustomTaxonNameTypesFetched) {
    return null
  }

  return (
    <React.Fragment>
      {customTaxonNames
        .map((customTaxonName, index) => {
          return (
            <Grid.Column
              key={index} // eslint-disable-line react/no-array-index-key
              width={16}
            >
              <CustomTaxonNamesTableRow
                changeFieldValue={changeFieldValue}
                customTaxonName={customTaxonName}
                customTaxonNameTypeOptions={customTaxonNameTypeOptions}
                index={index}
                key={index} // eslint-disable-line react/no-array-index-key
                removeArrayFieldByIndex={removeArrayFieldByIndex}
              />
            </Grid.Column>
          )
        })
        .filter(item => !!item)}
      <AddButton
        id="add-customTaxonName"
        onClick={event => {
          event.preventDefault()
          changeFieldValue(getPath(customTaxonNames.length), {})
        }}
        textKey="other.addOtherName"
      />
    </React.Fragment>
  )
}

CustomTaxonNamesTable.propTypes = propTypes
CustomTaxonNamesTable.defaultProps = defaultProps

export default compose(connect(mapStateToProps), pathBuilder())(
  CustomTaxonNamesTable
)
