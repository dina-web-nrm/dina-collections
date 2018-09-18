import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ModuleTranslate } from 'coreModules/i18n/components'
import TogglableField from '../../TogglableField'
import Input from '../Input'
import RemarksWrapper from './RemarksWrapper'

const propTypes = {
  displayLabel: PropTypes.bool,
  enableHelpNotifications: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    form: PropTypes.string.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  parameterKey: PropTypes.string,
  resultPrefix: PropTypes.string,
  setAsLatestActiveField: PropTypes.func.isRequired,
  type: PropTypes.string,
}

const defaultProps = {
  displayLabel: false,
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
        <Input
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
    const { input, isLatestActiveField, setAsLatestActiveField } = props

    return (
      <RemarksWrapper
        input={input}
        isLatestActiveField={isLatestActiveField}
        setAsLatestActiveField={setAsLatestActiveField}
      >
        <div style={{ paddingTop: 8 }}>
          <ModuleTranslate capitalize module="form" textKey="addRemarks" />
        </div>
      </RemarksWrapper>
    )
  }

  renderResult(props) {
    const {
      input,
      isLatestActiveField,
      resultPrefix,
      setAsLatestActiveField,
    } = props

    const remarks = resultPrefix
      ? `${resultPrefix}:  ${input.value}`
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

export default RemarksInput
