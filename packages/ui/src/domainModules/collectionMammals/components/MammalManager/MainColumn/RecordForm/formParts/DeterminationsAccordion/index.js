import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import createLid from 'common/es5/createLid'
import config from 'config'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import formParts from 'coreModules/form/components/parts'
import DeterminationContent from './DeterminationContent'
import DeterminationTitle from './DeterminationTitle'

const { AddButton } = formParts

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/formParts/DeterminationsAccordion'
)

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    determinations: formValueSelector(state, 'individual.determinations'),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  determinations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object,
      determinedByAgentText: PropTypes.string,
      remarks: PropTypes.string,
      taxonNameStandardized: PropTypes.string,
    })
  ),
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  determinations: [],
}

const DeterminationsAccordion = ({
  changeFieldValue,
  determinations,
  formName,
  removeArrayFieldByIndex,
}) => {
  log.render()

  return (
    <React.Fragment>
      {determinations && determinations.length > 0 && (
        <Grid.Column width={16}>
          <Accordion
            expandFirstItemOnMountIfEmptyOrOnlyHasKey
            initialActiveMode={ALL_COLLAPSED}
            items={determinations}
            renderContent={props => (
              <DeterminationContent
                removeArrayFieldByIndex={removeArrayFieldByIndex}
                skipRemoveDeterminationConfirmation={config.isTest}
                {...props}
              />
            )}
            renderTitle={({ index, ...rest }) => (
              <DeterminationTitle
                formName={formName}
                index={index}
                {...determinations[index] || {}}
                {...rest}
              />
            )}
            skipRemoveDeterminationConfirmation={config.isTest}
          />
        </Grid.Column>
      )}
      <Grid.Column width={16}>
        <AddButton
          id="add-determination"
          module="collectionMammals"
          onClick={event => {
            event.preventDefault()
            const index = (determinations && determinations.length) || 0

            // Setting a unique key in value to prevent the accordion item from
            // disappearing if the user focuses and then blurs an input without
            // entering any value
            changeFieldValue(`individual.determinations.${index}`, {
              key: createLid(),
            })
          }}
          textKey="other.addDetermination"
        />
      </Grid.Column>
    </React.Fragment>
  )
}

DeterminationsAccordion.propTypes = propTypes
DeterminationsAccordion.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  pathBuilder()
)(DeterminationsAccordion)
