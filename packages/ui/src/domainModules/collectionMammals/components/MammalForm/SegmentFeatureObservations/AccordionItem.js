import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Icon } from 'semantic-ui-react'

import createLog from 'utilities/log'
import FeatureObservationsTable from './FeatureObservationsTable'

const log = createLog(
  'domainModules:collectionMammals:components:MammalForm:SegmentFeatureObservations:AccordionItem'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  headlineKey: PropTypes.string.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
  tableRowIndexStart: PropTypes.number.isRequired,
}

class AccordionItem extends Component {
  render() {
    const {
      active,
      changeFieldValue,
      groups,
      headlineKey,
      i18n,
      index,
      setAccordionActiveIndex,
      tableRowIndexStart,
    } = this.props

    log.render()
    return [
      <Accordion.Title
        active={active}
        index={index}
        key={`${index}.1`}
        onClick={event => {
          event.preventDefault()
          setAccordionActiveIndex({
            accordion: 'features',
            activeIndex: active ? -1 : index,
          })
        }}
      >
        <Icon name="dropdown" />
        {i18n.moduleTranslate({ fallback: headlineKey, textKey: headlineKey })}
      </Accordion.Title>,
      <Accordion.Content active={active} key={`${index}.2`}>
        <FeatureObservationsTable
          changeFieldValue={changeFieldValue}
          groups={groups}
          i18n={i18n}
          tableRowIndexStart={tableRowIndexStart}
        />
      </Accordion.Content>,
    ]
  }
}

AccordionItem.propTypes = propTypes

export default AccordionItem
