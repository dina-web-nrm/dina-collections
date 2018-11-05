import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import TogglableField from '../../TogglableField'
import TextArea from '../TextArea'
import RemarksWrapper from './RemarksWrapper'

const propTypes = {
  displayLabel: PropTypes.bool,
  emptyStateTextKey: PropTypes.string,
  enableHelpNotifications: PropTypes.bool,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    form: PropTypes.string.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  parameterKey: PropTypes.string,
  resultPrefix: PropTypes.string,
  type: PropTypes.string,
}

const defaultProps = {
  displayLabel: false,
  emptyStateTextKey: undefined,
  enableHelpNotifications: false,
  label: undefined,
  parameterKey: undefined,
  resultPrefix: undefined,
  type: 'text',
}

class RemarksInput extends PureComponent {
  /* eslint-disable class-methods-use-this */
  renderInput(props) {
    const {
      displayLabel,
      enableHelpNotifications,
      input,
      isLatestActiveField,
      label,
      module,
      parameterKey,
      setAsLatestActiveField,
      type,
    } = props

    return (
      <RemarksWrapper
        input={input}
        isLatestActiveField={isLatestActiveField}
        setAsLatestActiveField={setAsLatestActiveField}
      >
        <TextArea
          displayLabel={displayLabel}
          enableHelpNotifications={enableHelpNotifications}
          fluid
          focusOnMount
          input={input}
          label={label}
          module={module}
          parameterKey={parameterKey}
          type={type}
        />
      </RemarksWrapper>
    )
  }

  renderEmptyState(props) {
    const {
      emptyStateTextKey,
      i18n: { moduleTranslate },
      input,
      isLatestActiveField,
      module,
      setAsLatestActiveField,
    } = props

    return (
      <RemarksWrapper
        input={input}
        isLatestActiveField={isLatestActiveField}
        setAsLatestActiveField={setAsLatestActiveField}
      >
        <div style={{ color: 'rgba(0, 0, 0, 0.5)', paddingTop: 8 }}>
          {emptyStateTextKey
            ? moduleTranslate({
                capitalize: true,
                module,
                textKey: emptyStateTextKey,
              })
            : moduleTranslate({
                capitalize: true,
                module: 'form',
                textKey: 'addRemarks',
              })}
        </div>
      </RemarksWrapper>
    )
  }

  renderResult(props) {
    const {
      i18n: { moduleTranslate },
      input,
      isLatestActiveField,
      module,
      resultPrefix,
      resultPrefixTextKey,
      setAsLatestActiveField,
    } = props

    const remarks =
      resultPrefix || resultPrefixTextKey
        ? `${resultPrefix ||
            moduleTranslate({
              capitalize: true,
              module,
              textKey: resultPrefixTextKey,
            })}: ${input.value}`
        : input.value

    return (
      <RemarksWrapper
        input={input}
        isLatestActiveField={isLatestActiveField}
        setAsLatestActiveField={setAsLatestActiveField}
      >
        <div style={{ paddingTop: 8 }}>{remarks}</div>
      </RemarksWrapper>
    )
  }
  /* eslint-enable class-methods-use-this */

  render() {
    return (
      <TogglableField
        {...this.props}
        renderEmptyState={this.renderEmptyState}
        renderInput={this.renderInput}
        renderResult={this.renderResult}
      />
    )
  }
}

RemarksInput.propTypes = propTypes
RemarksInput.defaultProps = defaultProps

export default compose(withI18n())(RemarksInput)
