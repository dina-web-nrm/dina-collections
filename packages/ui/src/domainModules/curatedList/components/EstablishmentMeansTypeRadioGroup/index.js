import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Radio } from 'coreModules/form/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { ModuleTranslate } from 'coreModules/i18n/components'

const mapStateToProps = state => {
  return {
    establishmentMeansTypeOptions: globalCrudSelectors.establishmentMeansType.getAllAsOptions(
      state
    ),
  }
}

const propTypes = {
  allTypeFetched: PropTypes.bool.isRequired,
  establishmentMeansTypeOptions: PropTypes.array,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string,
}

const defaultProps = {
  establishmentMeansTypeOptions: [],
  label: undefined,
}

class EstablishmentMeansTypeRadioGroup extends Component {
  render() {
    const {
      allTypeFetched,
      establishmentMeansTypeOptions,
      label,
      input,
    } = this.props

    if (!allTypeFetched) {
      return null
    }

    return (
      <Radio
        input={input}
        label={<ModuleTranslate module="collectionMammals" textKey={label} />}
        radioOptions={establishmentMeansTypeOptions}
      />
    )
  }
}

EstablishmentMeansTypeRadioGroup.defaultProps = defaultProps
EstablishmentMeansTypeRadioGroup.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTypeFetched',
    resource: 'establishmentMeansType',
  }),
  connect(mapStateToProps)
)(EstablishmentMeansTypeRadioGroup)
