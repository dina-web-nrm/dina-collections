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

const log = createLog('modules:taxon:components:VernacularNamesTable:Row')

const languageOptions = [
  {
    key: 'en',
    text: 'English',
    value: 'en',
  },
  {
    key: 'sv',
    text: 'Svenska',
    value: 'sv',
  },
]

const propTypes = {
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class VernacularNamesTableRow extends PureComponent {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    const { getTranslationPath, index, removeArrayFieldByIndex } = this.props
    removeArrayFieldByIndex(getTranslationPath(), index)
  }

  render() {
    const { getPath, i18n: { moduleTranslate } } = this.props

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column width={5}>
          <Field
            autoComplete="off"
            className="transparent"
            component={DropdownSearch}
            displayLabel={false}
            module="taxon"
            name={getPath('language')}
            options={languageOptions}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'selectLanguage',
            })}
            type="dropdown-search-local"
          />
        </Grid.Column>
        <Grid.Column width={9}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            displayLabel={false}
            fluid
            module="taxon"
            name={getPath('name')}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'addNameOrNames',
            })}
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <ConfirmationPopup
            cancelButtonText={moduleTranslate({
              capitalize: true,
              textKey: 'cancel',
            })}
            confirmButtonText={moduleTranslate({
              capitalize: true,
              textKey: 'remove',
            })}
            header={moduleTranslate({
              capitalize: true,
              textKey: 'removeThisVernacularName',
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

VernacularNamesTableRow.propTypes = propTypes

export default compose(withI18n({ module: 'taxon' }), pathBuilder())(
  VernacularNamesTableRow
)
