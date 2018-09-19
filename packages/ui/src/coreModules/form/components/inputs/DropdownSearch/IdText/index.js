import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { injectSearchOptions } from 'coreModules/form/higherOrderComponents'
import DropdownSearchBase from '../Base'

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  pathToIdInValue: PropTypes.string.isRequired,
  pathToTextInValue: PropTypes.string.isRequired,
  updateSelectedOption: PropTypes.func.isRequired,
}

class DropdownSearchIdTextInput extends PureComponent {
  componentDidMount() {
    const { pathToIdInValue, pathToTextInValue } = this.props
    const id = objectPath.get(this.props, `input.value.${pathToIdInValue}`)
    const text = objectPath.get(this.props, `input.value.${pathToTextInValue}`)
    const value = objectPath.get(this.props, `input.value`)

    if ((id || text) && !config.isTest) {
      this.props.updateSelectedOption({
        id,
        requireEitherOr: true,
        text,
        value,
      })
    }
  }

  componentDidUpdate() {
    const { pathToIdInValue, pathToTextInValue } = this.props

    const selectedOptionId = objectPath.get(
      this.props,
      `selectedOption.value.${pathToIdInValue}`
    )
    const id = objectPath.get(this.props, `input.value.${pathToIdInValue}`)

    const selectedOptionText = objectPath.get(
      this.props,
      `selectedOption.value.${pathToTextInValue}`
    )
    const text = objectPath.get(this.props, `input.value.${pathToTextInValue}`)

    const value = objectPath.get(this.props, `input.value`)

    if (selectedOptionId !== id || selectedOptionText !== text) {
      setTimeout(() => {
        this.props.updateSelectedOption({
          id,
          requireEitherOr: true,
          text,
          value,
        })
      })
    }
  }

  render() {
    return <DropdownSearchBase icon="search" limit={20} {...this.props} />
  }
}

DropdownSearchIdTextInput.propTypes = propTypes

export default compose(
  withI18n({ module: 'form' }),
  injectSearchOptions({ enablePlainTextOption: true })
)(DropdownSearchIdTextInput)
