import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'

import actionCreators from 'coreModules/crud/actionCreators'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import ReadOnly from 'coreModules/form/components/inputs/CustomData/ReadOnly'

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { sourceDataId } = {} } = {} } = ownProps

  return { sourceDataId }
}

const mapDispatchToProps = {
  getOneResourceActivity: actionCreators.resourceActivity.getOne,
}

const propTypes = {
  getOneResourceActivity: PropTypes.func.isRequired,
  sourceDataId: PropTypes.string.isRequired,
}

class SourceData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceData: null,
    }
  }
  componentDidMount() {
    return this.props
      .getOneResourceActivity({
        id: this.props.sourceDataId,

        queryParams: {
          includeFields: [
            'id',
            'attributes.sourceData',
            'attributes.resource',
            'attributes.resourceId',
          ],
        },
        relationships: [],
      })
      .then(res => {
        const { resource, resourceId, sourceData } = res.attributes
        this.setState({
          resource,
          resourceId,
          sourceData,
        })
      })
  }
  render() {
    const { resource, resourceId, sourceData } = this.state
    let header = `Source data for ${resource}. Id: ${resourceId}`

    if (resource === 'specimen') {
      const catalogNumber =
        sourceData && sourceData.Objects && sourceData.Objects.AccessionNo
      if (catalogNumber) {
        header = `Source data for ${resource} ${catalogNumber}`
      }
    }

    return (
      <PageTemplate>
        <Grid columns={1} textAlign="left">
          <Grid.Column>
            <Header>{sourceData && header}</Header>
            <div className="ui form">
              {sourceData && (
                <ReadOnly defaultExpanded input={{ value: sourceData }} />
              )}
            </div>
          </Grid.Column>
        </Grid>
      </PageTemplate>
    )
  }
}

SourceData.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceData)
