import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'
import crudSelectors from 'coreModules/crud/globalSelectors'

const mapStateToProps = (state, { itemId }) => {
  const getOneSelector = crudSelectors.specimen.getOne
  const item = getOneSelector(state, itemId)
  return {
    item,
  }
}

const propTypes = {
  background: PropTypes.string.isRequired,
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  item: undefined,
}

const InfiniteTableRow = ({ background, item, onClick, width }) => {
  if (!item) {
    return (
      <Grid.Row style={{ height: 43, width }}>
        <Grid.Column>Loading...</Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid.Row
      onClick={event => {
        event.preventDefault()
        onClick(item.id)
      }}
      style={{ background, height: 43, width }}
    >
      <Grid.Column style={{ width: 150 }}>
        {item.attributes.normalized.identifiers &&
          item.attributes.normalized.identifiers[0].value}
      </Grid.Column>
      <Grid.Column style={{ width: 200 }}>
        {item.attributes.readOnly.objects.Scientific_Name}
      </Grid.Column>
      <Grid.Column style={{ width: 200 }}>
        {item.attributes.readOnly.objects.Family}
      </Grid.Column>
      <Grid.Column style={{ width: 200 }}>
        {item.attributes.readOnly.objects.Genus}
      </Grid.Column>
      <Grid.Column style={{ width: 200 }}>
        {item.attributes.readOnly.objects.Species}
      </Grid.Column>
      <Grid.Column style={{ width: 100 }}>
        {item.attributes.normalized.events[0].dateRange.startDate.dateText}
      </Grid.Column>
      <Grid.Column style={{ width: 300 }}>
        {item.attributes.normalized.events[0].locationInformation.localityT}
      </Grid.Column>
      <Grid.Column style={{ width: 100 }}>
        {item.attributes.readOnly.objects.WayOfDeath &&
          item.attributes.readOnly.objects.WayOfDeath_related.DödsorsakEN}
      </Grid.Column>
      <Grid.Column style={{ width: 100 }}>
        {item.attributes.readOnly.analysis.Sex}
      </Grid.Column>
      <Grid.Column style={{ width: 100 }}>
        {item.attributes.readOnly.analysis.AgeStage}
      </Grid.Column>
    </Grid.Row>
  )
}

InfiniteTableRow.propTypes = propTypes
InfiniteTableRow.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(InfiniteTableRow)
