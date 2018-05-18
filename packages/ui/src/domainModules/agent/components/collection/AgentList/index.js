import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { ITEM_CLICK } from 'coreModules/crudBlocks/constants'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/crudBlocks/keyObjectModule'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import agentSelectors from '../../../globalSelectors'
import ListItem from './ListItem'

const mapStateToProps = (state, { name }) => {
  const filter = keyObjectGlobalSelectors.get[':name.filter'](state, { name })

  const agents = agentSelectors.getAgentsArrayByFilter(state, filter)

  return {
    agents,
    filter,
    numberOfAgents: agents.length,
  }
}

const mapDispatchToProps = {
  setFilter: keyObjectActionCreators.set[':name.filter'],
  setFilterOffset: keyObjectActionCreators.set[':name.filter.offset'],
}

const propTypes = {
  agents: PropTypes.array,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  itemId: PropTypes.string,
  name: PropTypes.string.isRequired,
  numberOfAgents: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setFilterOffset: PropTypes.func.isRequired,
}

const defaultProps = {
  agents: [],
  filter: {},
  itemId: '',
}

class AgentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 0,
    }

    this.getIndexFromOffsetAndNumberOfLocalities = this.getIndexFromOffsetAndNumberOfLocalities.bind(
      this
    )
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setCursorIndex = this.setCursorIndex.bind(this)
  }

  componentWillMount() {
    const { name } = this.props
    this.props.setFilter(
      {
        group: '',
        limit: 10,
        offset: 0,
        searchQuery: '',
      },
      { name }
    )
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  getIndexFromOffsetAndNumberOfLocalities() {
    const { filter: { offset }, numberOfAgents } = this.props

    return Math.max(Math.min(offset, numberOfAgents - 1), 0)
  }

  setCursorIndex(cursorIndex = 0) {
    this.setState({ cursorIndex })
  }

  selectAgentAtCursor() {
    const { agents } = this.props
    const { cursorIndex } = this.state
    const agentAtCursor = agents[cursorIndex]
    if (agentAtCursor) {
      this.props.onInteraction(ITEM_CLICK, { itemId: agentAtCursor.id })
    }
  }

  moveCursorUp() {
    const { filter: { offset, limit }, name } = this.props
    const { cursorIndex } = this.state
    if (offset > 0 && cursorIndex === 0) {
      this.props.setFilterOffset(Math.max(offset - 1, 0), { name })
      this.setState({
        cursorIndex: limit - 1,
      })
    }

    this.setState({
      cursorIndex: Math.max(cursorIndex - 1, 0),
    })
  }

  moveCursorDown() {
    const { filter: { offset, limit }, name, numberOfAgents } = this.props
    const { cursorIndex } = this.state

    if (cursorIndex === numberOfAgents) {
      return null
    }
    if (cursorIndex === limit - 1) {
      return this.props.setFilterOffset(offset + 1, { name })
    }

    return this.setState({
      cursorIndex: Math.min(cursorIndex + 1, limit),
    })
  }

  handleKeyDown({ key }) {
    switch (key) {
      case 'ArrowDown': {
        return this.moveCursorDown()
      }
      case 'ArrowUp': {
        return this.moveCursorUp()
      }
      case 'Enter': {
        return this.selectAgentAtCursor()
      }
      default: {
        return null
      }
    }
  }

  render() {
    const { cursorIndex } = this.state
    const {
      disableEdit,
      displayNavigationButtons,
      itemId,
      onInteraction,
      agents,
    } = this.props

    return (
      <List divided selection size="small" verticalAlign="middle">
        {agents.map((agent, index) => {
          const cursorFocus = index === cursorIndex
          return (
            <ListItem
              agent={agent}
              cursorFocus={cursorFocus}
              disableEdit={disableEdit}
              displayNavigationButtons={displayNavigationButtons}
              itemId={itemId}
              key={agent.id}
              onInteraction={onInteraction}
            />
          )
        })}
      </List>
    )
  }
}

AgentList.propTypes = propTypes
AgentList.defaultProps = defaultProps

export default compose(
  createEnsureAllItemsFetched({
    resource: 'agent',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(AgentList)
