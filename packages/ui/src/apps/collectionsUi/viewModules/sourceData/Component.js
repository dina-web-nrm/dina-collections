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
          includeFields: ['id', 'attributes.sourceData'],
        },
        relationships: [],
      })
      .then(res => {
        const { sourceData } = res.attributes
        this.setState({
          sourceData,
        })
      })
  }
  render() {
    const { sourceData } = this.state
    return (
      <PageTemplate container fullViewHeight>
        <Grid columns={1} textAlign="left">
          <Grid.Column>
            <Header>Source data</Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(SourceData)
