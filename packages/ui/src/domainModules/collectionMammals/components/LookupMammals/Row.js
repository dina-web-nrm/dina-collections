import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { List } from 'semantic-ui-react'

const mapStateToProps = (state, { itemId }) => {
  const getOneSelector = crudSelectors.specimen.getOne
  const item = getOneSelector(state, itemId)
  return {
    item,
  }
}

const propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}

const defaultProps = {
  item: undefined,
}

class Row extends Component {
  render() {
    const { item } = this.props
    if (!item) {
      return <List.Item>Loading</List.Item>
    }
    return (
      <List.Item
        key={item.id}
        onClick={event => {
          event.preventDefault()
          this.props.onClick(item.id)
        }}
      >
        {item.id}
        ,{item.attributes.normalized.identifiers &&
          item.attributes.normalized.identifiers[0].value}
      </List.Item>
    )
  }
}

Row.propTypes = propTypes
Row.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(Row)
