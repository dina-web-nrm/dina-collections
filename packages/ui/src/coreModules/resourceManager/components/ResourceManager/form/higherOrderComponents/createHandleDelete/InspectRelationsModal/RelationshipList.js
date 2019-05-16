import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import ListItem from './ListItem'

const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ]),
  fetchItemById: PropTypes.func.isRequired,
}
const defaultProps = {
  data: {},
}

class RelationshipList extends PureComponent {
  render() {
    const { data, fetchItemById } = this.props
    const isArray = Array.isArray(data)

    return (
      <List divided selection verticalAlign="middle">
        {(isArray ? data : [data]).slice(0, 30).map(({ id, type }) => {
          fetchItemById(id)
          return <ListItem id={id} key={id} resource={type} />
        })}
      </List>
    )
  }
}

RelationshipList.propTypes = propTypes
RelationshipList.defaultProps = defaultProps

export default createBatchFetchItems({
  includeFields: ['id', 'attributes'],
})(RelationshipList)
