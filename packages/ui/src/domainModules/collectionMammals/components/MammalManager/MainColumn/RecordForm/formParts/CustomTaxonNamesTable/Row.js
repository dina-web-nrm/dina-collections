import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import {
  ConfirmationPopup,
  DropdownSearch,
  Field,
  Input,
} from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/formParts/CustomTaxonNamesTable/Row'
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
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillMount() {
    const { changeFieldValue, customTaxonName, getPath } = this.props
    changeFieldValue(getPath('customTaxonName.id'), customTaxonName.id)
  }

  handleRemove() {
    const { getTranslationPath, index, removeArrayFieldByIndex } = this.props
    removeArrayFieldByIndex(getTranslationPath(), index)
  }

  render() {
    const {
      customTaxonNameTypeOptions,
      getPath,
      i18n: { moduleTranslate },
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
          <ConfirmationPopup
            cancelButtonText={moduleTranslate({
              capitalize: true,
              textKey: 'other.cancel',
            })}
            confirmButtonText={moduleTranslate({
              capitalize: true,
              textKey: 'other.remove',
            })}
            header={moduleTranslate({
              capitalize: true,
              textKey: 'other.removeThisOtherName',
            })}
            hideOnScroll
            iconName="trash"
            onConfirm={this.handleRemove}
            size="large"
            type="icon"
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
