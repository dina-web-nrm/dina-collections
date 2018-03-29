import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Breadcrumb, Label, Icon } from 'semantic-ui-react'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'domainModules/locality/keyObjectModule'

import globalSelectors from 'domainModules/localityService/globalSelectors'

const mapStateToProps = state => {
  const parentFilterId = keyObjectGlobalSelectors.get['filter.parentId'](state)
  const ancestors = parentFilterId
    ? globalSelectors.getCuratedLocalityAncestorsById(state, parentFilterId)
    : undefined
  return {
    ancestors,
  }
}

const mapDispatchToProps = {
  setParentId: keyObjectActionCreators.set['filter.parentId'],
}

const propTypes = {
  ancestors: PropTypes.array,
  setParentId: PropTypes.func.isRequired,
}

const defaultProps = {
  ancestors: undefined,
}

class AncestorTag extends Component {
  render() {
    const { ancestors, setParentId } = this.props
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
                    setParentId(ancestor.id)
                  }}
                >
                  {ancestor.name}
                </Breadcrumb.Section>
              </React.Fragment>
            )
          })}
        </Breadcrumb>
        <Icon
          name="delete"
          onClick={event => {
            event.preventDefault()
            setParentId('')
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
