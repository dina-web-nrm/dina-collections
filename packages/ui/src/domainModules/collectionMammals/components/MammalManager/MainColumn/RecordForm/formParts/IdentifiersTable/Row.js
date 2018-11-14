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
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/formParts/IdentifiersTable/Row'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  identifier: PropTypes.shape({
    id: PropTypes.string,
    identifierType: PropTypes.object,
    remarks: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  identifierTypeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class IdentifiersTableRow extends PureComponent {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillMount() {
    const { changeFieldValue, getPath, identifier } = this.props
    changeFieldValue(getPath('identifier.id'), identifier.id)
  }

  handleRemove() {
    const { getTranslationPath, index, removeArrayFieldByIndex } = this.props
    removeArrayFieldByIndex(getTranslationPath(), index)
  }

  render() {
    const {
      identifierTypeOptions,
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
            name={getPath('identifierType.id')}
            options={identifierTypeOptions}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'other.selectIdentifierType',
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
              textKey: 'other.addIdentifierOrIdentifiers',
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
              textKey: 'other.removeThisIdentifier',
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

IdentifiersTableRow.propTypes = propTypes

export default compose(
  withI18n({ module: 'collectionMammals' }),
  pathBuilder()
)(IdentifiersTableRow)
