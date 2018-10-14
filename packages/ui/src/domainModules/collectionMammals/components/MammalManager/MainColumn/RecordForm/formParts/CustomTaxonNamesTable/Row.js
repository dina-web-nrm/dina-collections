import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Icon, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/FormRow/formParts/CustomTaxonNamesTable/Row'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  customTaxonName: PropTypes.shape({
    customTaxonNameType: PropTypes.object,
    id: PropTypes.string,
    remarks: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  customTaxonNameTypeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class CustomTaxonNamesTableRow extends PureComponent {
  componentWillMount() {
    const { changeFieldValue, customTaxonName, getPath } = this.props
    changeFieldValue(getPath('customTaxonName.id'), customTaxonName.id)
  }

  render() {
    const {
      customTaxonNameTypeOptions,
      getPath,
      getTranslationPath,
      i18n: { moduleTranslate },

      index,
      removeArrayFieldByIndex,
    } = this.props

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column width={6}>
          <Field
            autoComplete="off"
            className="transparent"
            component={DropdownSearch}
            displayLabel={false}
            module="collectionMammals"
            name={getPath('customTaxonNameType.id')}
            options={customTaxonNameTypeOptions}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'other.selectKindOfName',
            })}
            type="dropdown-search-local"
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            displayLabel={false}
            fluid
            module="collectionMammals"
            name={getPath('value')}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'other.addNameOrNames',
            })}
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <Icon
            name="trash"
            onClick={event => {
              event.preventDefault()
              removeArrayFieldByIndex(getTranslationPath(), index)
            }}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

CustomTaxonNamesTableRow.propTypes = propTypes

export default compose(
  withI18n({ module: 'collectionMammals' }),
  pathBuilder()
)(CustomTaxonNamesTableRow)
