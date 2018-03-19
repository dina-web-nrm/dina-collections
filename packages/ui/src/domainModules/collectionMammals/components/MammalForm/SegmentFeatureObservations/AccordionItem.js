import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Icon } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'
import FeatureObservationsTable from './FeatureObservationsTable'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentFeatureObservations:AccordionItem'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  headlineKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
}

class AccordionItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      renderContent: props.active,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.renderContent) {
      if (!this.props.active && nextProps.active) {
        log.debug('set loading true', this.props.headlineKey)
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({ renderContent: true })
        }, 0)
      }
    }
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.renderContent && this.state.renderContent) {
      log.debug('set loading false', this.props.headlineKey)
      this.setState({ loading: false }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  render() {
    const {
      active,
      changeFieldValue,
      groups,
      headlineKey,
      index,
      setAccordionActiveIndex,
    } = this.props

    const { loading, renderContent } = this.state

    log.render()
    log.debug('loading & renderContent', loading, renderContent)
    return (
      <React.Fragment>
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
          {loading && (
            <ModuleTranslate module="collectionMammals" textKey="loading" />
          )}
          {!loading && (
            <ModuleTranslate
              fallback={headlineKey}
              module="collectionMammals"
              scope="featureObservations"
              textKey={headlineKey}
            />
          )}
        </Accordion.Title>
        {renderContent && (
          <Accordion.Content active={active} key={`${index}.2`}>
            <FeatureObservationsTable
              changeFieldValue={changeFieldValue}
              groups={groups}
            />
          </Accordion.Content>
        )}
      </React.Fragment>
    )
  }
}

AccordionItem.propTypes = propTypes

export default AccordionItem
