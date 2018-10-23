import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { arrayRemove, change } from 'redux-form'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import AddButton from 'coreModules/form/components/parts/StaticContent/AddButton'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import VernacularNamesTableRow from './Row'

const log = createLog('modules:taxon:components:VernacularNamesTable')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    vernacularNames: formValueSelector(state, 'vernacularNames'),
  }
}
const mapDispatchToProps = {
  changeFormValue: change,
  removeArrayField: arrayRemove,
}

const propTypes = {
  changeFormValue: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  getPath: PropTypes.func.isRequired,
  removeArrayField: PropTypes.func.isRequired,
  vernacularNames: PropTypes.arrayOf(PropTypes.object),
}
const defaultProps = {
  vernacularNames: [],
}

class VernacularNamesTable extends PureComponent {
  constructor(props) {
    super(props)
    this.changeFieldValue = this.changeFieldValue.bind(this)
    this.removeArrayFieldByIndex = this.removeArrayFieldByIndex.bind(this)
  }

  changeFieldValue(fieldName, value) {
    this.props.changeFormValue(this.props.formName, fieldName, value)
  }

  removeArrayFieldByIndex(fieldName, index) {
    this.props.removeArrayField(this.props.formName, fieldName, index)
  }

  render() {
    log.render()
    const { getPath, vernacularNames } = this.props

    return (
      <Grid>
        <Grid.Row className="relaxed">
          {vernacularNames
            .map((vernacularName, index) => {
              return (
                <Grid.Column
                  key={index} // eslint-disable-line react/no-array-index-key
                  width={16}
                >
                  <VernacularNamesTableRow
                    changeFieldValue={this.changeFieldValue}
                    index={index}
                    key={index} // eslint-disable-line react/no-array-index-key
                    removeArrayFieldByIndex={this.removeArrayFieldByIndex}
                  />
                </Grid.Column>
              )
            })
            .filter(item => !!item)}
          <Grid.Column width={16}>
            <AddButton
              id="add-vernacular-name"
              module="taxon"
              onClick={event => {
                event.preventDefault()
                this.changeFieldValue(getPath(vernacularNames.length), {
                  taxonNameType: 'vernacular',
                  type: 'taxonName',
                })
              }}
              textKey="addVernacularName"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
VernacularNamesTable.propTypes = propTypes
VernacularNamesTable.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pathBuilder()
)(VernacularNamesTable)
