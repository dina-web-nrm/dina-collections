import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import {
  CATALOG_CARD,
  CATALOG_CARD_CREATION_DESCRIPTION,
} from 'domainModules/collectionMammals/constants'
import Fields from './Fields'
import getNestedName from './getNestedName'

const mapStateToProps = (state, { formValueSelector, name }) => {
  const baseName = getNestedName({ formValueSelector, name, state })

  return {
    baseName,
    hasAgentOrDate:
      !isEmpty(formValueSelector(state, `${baseName}.agent`)) ||
      !isEmpty(formValueSelector(state, `${baseName}.date`)),
    recordHistoryEvents: formValueSelector(state, name),
  }
}

const propTypes = {
  baseName: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  hasAgentOrDate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  recordHistoryEvents: PropTypes.arrayOf(PropTypes.object),
}
const defaultProps = {
  recordHistoryEvents: [],
}

class CatalogCardInformation extends PureComponent {
  componentDidMount() {
    this.props.changeFieldValue(`${this.props.baseName}.system`, CATALOG_CARD)
    this.props.changeFieldValue(
      `${this.props.baseName}.description`,
      CATALOG_CARD_CREATION_DESCRIPTION
    )
  }

  componentWillUnmount() {
    const {
      baseName,
      changeFieldValue,
      hasAgentOrDate,
      name,
      recordHistoryEvents,
    } = this.props

    if (!hasAgentOrDate) {
      const nameParts = baseName.split('.')
      const index = nameParts[nameParts.length - 1]

      let updatedRecordHistoryEvents = [...recordHistoryEvents]
      updatedRecordHistoryEvents[index] = undefined
      updatedRecordHistoryEvents = updatedRecordHistoryEvents.filter(
        item => !!item
      )
      changeFieldValue(name, updatedRecordHistoryEvents)
    }
  }

  render() {
    const { baseName } = this.props

    return <Fields baseName={baseName} />
  }
}

CatalogCardInformation.propTypes = propTypes
CatalogCardInformation.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(CatalogCardInformation)
