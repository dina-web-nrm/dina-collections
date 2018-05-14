import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Breadcrumb, Label, Icon } from 'semantic-ui-react'

import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../../../../keyObjectModule'

const mapStateToProps = (state, { getAncestorsByParentId, name }) => {
  const parentFilterId = keyObjectGlobalSelectors.get[':name.filter.parentId'](
    state,
    { name }
  )
  const ancestors = parentFilterId
    ? getAncestorsByParentId(state, parentFilterId)
    : undefined
  return {
    ancestors,
  }
}

const mapDispatchToProps = {
  setParentId: keyObjectActionCreators.set[':name.filter.parentId'],
}

const propTypes = {
  ancestors: PropTypes.array,
  name: PropTypes.string.isRequired,
  setParentId: PropTypes.func.isRequired,
}

const defaultProps = {
  ancestors: undefined,
}

class AncestorTag extends Component {
  render() {
    const { ancestors, name, setParentId } = this.props
    if (!ancestors) {
      return null
    }
    return (
      <Label>
        <Breadcrumb>
          {ancestors.map((ancestor, index) => {
            return (
              <React.Fragment key={ancestor.id}>
                {index !== 0 && <Breadcrumb.Divider />}
                <Breadcrumb.Section
                  link
                  onClick={event => {
                    event.preventDefault()
                    setParentId(ancestor.id, { name })
                  }}
                >
                  {ancestor.attributes && ancestor.attributes.name}
                </Breadcrumb.Section>
              </React.Fragment>
            )
          })}
        </Breadcrumb>
        <Icon
          name="delete"
          onClick={event => {
            event.preventDefault()
            setParentId('', { name })
          }}
        />
      </Label>
    )
  }
}

AncestorTag.propTypes = propTypes
AncestorTag.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AncestorTag
)
