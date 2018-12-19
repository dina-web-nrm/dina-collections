import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Modal } from 'semantic-ui-react'
import { createApplicationLayer } from 'coreModules/layout/higherOrderComponents'
import { APPLICATION_LAYER_MODAL } from 'coreModules/layout/constants'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state, { open }) => {
  return {
    layerActive: open,
  }
}

class LayerModal extends PureComponent {
  render() {
    const { children, ...rest } = this.props
    return (
      <Modal className="ui form" {...rest}>
        {children}
      </Modal>
    )
  }
}

LayerModal.propTypes = propTypes

export default compose(
  connect(mapStateToProps),
  createApplicationLayer({
    layer: APPLICATION_LAYER_MODAL,
  })
)(LayerModal)
