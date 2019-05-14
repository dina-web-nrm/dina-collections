import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import extractProps from 'utilities/extractProps'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { ColumnRowHeader } from 'coreModules/commonUi/components'
import Body from './Body'

const propTypes = {
  descriptionHeaderKey: PropTypes.string,
  removeNotification: PropTypes.func.isRequired,
  sequentialId: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
}
const defaultProps = {
  descriptionHeaderKey: undefined,
}

class InlineWrapper extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(event) {
    event.preventDefault()

    const { removeNotification, sequentialId } = this.props

    removeNotification({ sequentialId })
  }

  render() {
    const { descriptionHeaderKey, windowHeight } = this.props

    const { extractedProps } = extractProps({
      keys: [
        'description',
        'descriptionKey',
        'displayLinkToUserManual',
        'linkTextKey',
        'linkTo',
      ],
      props: this.props,
    })

    return (
      <RowLayout
        availableHeight={windowHeight - emToPixels(3.4375)}
        dataTestId="inlineNotification"
      >
        <RowLayout.Row height="50px">
          <ColumnRowHeader
            onClose={this.handleClose}
            textKey={descriptionHeaderKey}
          />
        </RowLayout.Row>
        <RowLayout.Row>
          <Body {...extractedProps} />
        </RowLayout.Row>
      </RowLayout>
    )
  }
}

InlineWrapper.propTypes = propTypes
InlineWrapper.defaultProps = defaultProps

export default compose(injectWindowHeight)(InlineWrapper)
