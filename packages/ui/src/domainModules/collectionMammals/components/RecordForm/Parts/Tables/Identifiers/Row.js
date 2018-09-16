import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Icon, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIdentifiers:IdentifiersTableRow'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
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
  componentWillMount() {
    const { changeFieldValue, getPath, identifier } = this.props
    changeFieldValue(getPath('identifier.id'), identifier.id)
  }

  render() {
    const {
      identifierTypeOptions,
      getPath,
      getTranslationPath,
      index,
      removeArrayFieldByIndex,
    } = this.props

    log.render()
    return (
      <Grid key={index} textAlign="left" verticalAlign="middle">
        <Grid.Column width={5}>
          <Field
            autoComplete="off"
            className="transparent"
            component={DropdownSearch}
            displayLabel={false}
            module="collectionMammals"
            name={getPath('identifierType.id')}
            options={identifierTypeOptions}
            type="dropdown-search-local"
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            displayLabel={false}
            fluid
            module="collectionMammals"
            name={getPath('value')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Icon
            name="trash alternate"
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

IdentifiersTableRow.propTypes = propTypes

export default compose(pathBuilder())(IdentifiersTableRow)
