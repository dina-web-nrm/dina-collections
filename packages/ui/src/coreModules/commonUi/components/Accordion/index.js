import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Accordion } from 'semantic-ui-react'

import createLog from 'utilities/log'
import {
  ALL_COLLAPSED,
  ALL_EXPANDED,
  FIRST_EXPANDED,
  MULTI,
  SINGLE,
} from '../../constants'

const log = createLog('modules:commonUi:Accordion')

const propTypes = {
  delayItemRenderUntilActive: PropTypes.bool,
  expandItemOnAdd: PropTypes.bool,
  fluid: PropTypes.bool,
  initialActiveMode: PropTypes.oneOf([
    ALL_COLLAPSED,
    ALL_EXPANDED,
    FIRST_EXPANDED,
  ]),
  items: PropTypes.arrayOf(PropTypes.object.isRequired),
  renderContent: PropTypes.func,
  renderTitle: PropTypes.func.isRequired,
  selectMode: PropTypes.oneOf([MULTI, SINGLE]),
  styled: PropTypes.bool,
}
const defaultProps = {
  delayItemRenderUntilActive: false,
  expandItemOnAdd: true,
  fluid: true,
  initialActiveMode: ALL_COLLAPSED,
  items: [],
  renderContent: undefined,
  selectMode: SINGLE,
  styled: true,
}

class AccordionWrapper extends Component {
  constructor(props) {
    super(props)
    this.handleSetActive = this.handleSetActive.bind(this)
    this.handleSetInactive = this.handleSetInactive.bind(this)
    this.handleToggleActive = this.handleToggleActive.bind(this)
    this.isActive = this.isActive.bind(this)
    this.shouldRenderContent = this.shouldRenderContent.bind(this)

    const { initialActiveMode, items } = props

    const initialState = {
      hasBeenActive: {},
    }

    // set initial active indices and add them to the hasBeenActive map
    if (initialActiveMode === ALL_EXPANDED) {
      items.forEach((_, index) => {
        initialState[index] = true
        initialState.hasBeenActive[index] = true
      })
    } else if (initialActiveMode === FIRST_EXPANDED) {
      initialState[0] = true
      initialState.hasBeenActive[0] = true
    }

    this.state = initialState
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.expandItemOnAdd &&
      nextProps.items.length > this.props.items.length
    ) {
      // if an item has been added, set that as active
      this.handleSetActive(nextProps.items.length - 1)
    }
  }

  handleSetInactive(index) {
    if (!this.state[index]) {
      // escape if index is already inactive
      return
    }

    this.setState({ [index]: false })
  }

  handleSetActive(index) {
    if (this.state[index]) {
      // escape if index is already active
      return
    }

    // item was inactive and should be marked active. need to build new state
    let newState = {}

    // if delayItemRenderUntilActive is true, we add this index to the map of
    // hasBeenActive indices
    const { delayItemRenderUntilActive } = this.props

    if (delayItemRenderUntilActive) {
      newState.hasBeenActive = {
        ...this.state.hasBeenActive,
        [index]: true,
      }
    }

    // if we're in single select mode then the rest should be set inactive
    if (this.props.selectMode === SINGLE) {
      newState = Object.keys(this.state).reduce((obj, key) => {
        // escape if key is not a number (i.e. not an index)
        if (Number.isNaN(Number(key))) {
          return obj
        }

        return {
          ...obj,
          [key]: false,
        }
      }, newState)
    }

    // lastly, set this index to true
    newState[index] = true

    this.setState(newState)
  }

  handleToggleActive(index) {
    if (this.state[index]) {
      this.handleSetInactive(index)
    } else {
      this.handleSetActive(index)
    }
  }

  isActive(index) {
    return !!this.state[index]
  }

  shouldRenderContent(index) {
    const { delayItemRenderUntilActive } = this.props

    if (delayItemRenderUntilActive) {
      // render & keep rendered if it has been active or if it is active now
      return this.state.hasBeenActive[index] || this.isActive(index)
    }

    // always render content when should not delayItemRenderUntilActive
    return true
  }

  render() {
    const { fluid, items, renderContent, renderTitle, styled } = this.props

    log.render()
    return (
      <Accordion fluid={fluid} styled={styled}>
        {items.map((item, index) => {
          const isActive = this.isActive(index)

          return (
            <React.Fragment key={item.id || index}>
              <Accordion.Title
                active={isActive}
                index={index}
                onClick={event => {
                  event.preventDefault()
                  this.handleToggleActive(index)
                }}
              >
                {renderTitle({
                  active: isActive,
                  handleSetActive: this.handleSetActive,
                  handleSetInactive: this.handleSetInactive,
                  index,
                  ...item,
                })}
              </Accordion.Title>
              {this.shouldRenderContent(index) &&
                renderContent && (
                  <Accordion.Content active={isActive}>
                    {renderContent({
                      active: isActive,
                      handleSetActive: this.handleSetActive,
                      handleSetInactive: this.handleSetInactive,
                      index,
                      ...item,
                    })}
                  </Accordion.Content>
                )}
            </React.Fragment>
          )
        })}
      </Accordion>
    )
  }
}

AccordionWrapper.propTypes = propTypes
AccordionWrapper.defaultProps = defaultProps

export default AccordionWrapper
