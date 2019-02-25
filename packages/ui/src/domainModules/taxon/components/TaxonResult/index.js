import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Icon } from 'semantic-ui-react'
import objectPath from 'object-path'

import config from 'config'
import extractProps from 'utilities/extractProps'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { FieldTemplate } from 'coreModules/form/components'
import { propTypes as fieldTemplateProps } from 'coreModules/form/components/FieldTemplate'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { ROOT_TAXON_NAME } from '../../constants'

const getAcceptedTaxonNameFromTaxon = taxon => {
  return objectPath.get(taxon, 'acceptedTaxonName.name')
}

const getParentAcceptedTaxonNames = (taxon, taxonNames = []) => {
  const acceptedTaxonName = getAcceptedTaxonNameFromTaxon(taxon)

  if (acceptedTaxonName !== ROOT_TAXON_NAME) {
    taxonNames.push(acceptedTaxonName)

    if (taxon.parent) {
      return getParentAcceptedTaxonNames(taxon.parent, taxonNames)
    }
  }

  return taxonNames.reverse().join(' > ')
}

const propTypes = {
  focusOnMount: PropTypes.bool,
  forceRenderResult: PropTypes.bool,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  isLatestActiveField: PropTypes.bool,
  removeForceRenderResult: PropTypes.func,
  setAsLatestActiveField: PropTypes.func,
  taxon: PropTypes.shape({
    acceptedTaxonName: PropTypes.shape({ name: PropTypes.string.isRequired }),
    parent: PropTypes.shape({
      acceptedTaxonName: PropTypes.shape({ name: PropTypes.string.isRequired }),
      parent: PropTypes.object,
    }),
  }),
  textOnly: PropTypes.bool,
}
const defaultProps = {
  focusOnMount: false,
  forceRenderResult: false,
  isLatestActiveField: false,
  removeForceRenderResult: undefined,
  setAsLatestActiveField: undefined,
  taxon: undefined,
  textOnly: false,
}

class TaxonResult extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.focusOnMount && !config.isTest) {
      this.button.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.forceRenderResult &&
      prevProps.isLatestActiveField !== this.props.isLatestActiveField &&
      !this.props.isLatestActiveField
    ) {
      this.props.removeForceRenderResult()
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.removeForceRenderResult()
    this.props.setAsLatestActiveField()
  }

  render() {
    const {
      input: { name },
      taxon,
      textOnly,
    } = this.props

    const acceptedTaxonName =
      taxon && objectPath.get(taxon, 'acceptedTaxonName.name')
    const suffix = taxon && objectPath.get(taxon, 'acceptedTaxonName.rank')
    const parentAcceptedTaxonNames = taxon && getParentAcceptedTaxonNames(taxon)

    const { extractedProps } = extractProps({
      keys: Object.keys(fieldTemplateProps),
      props: this.props,
    })

    if (textOnly) {
      return (
        <React.Fragment>
          {`${acceptedTaxonName} (${suffix})
            ${parentAcceptedTaxonNames}
          `}
        </React.Fragment>
      )
    }

    return (
      <FieldTemplate {...extractedProps} name={name}>
        <div style={{ position: 'relative' }}>
          <strong>{acceptedTaxonName}</strong>
          {suffix && ` (${suffix})`}
          <Button
            icon
            onClick={this.handleClick}
            ref={element => {
              this.button = element
            }}
            style={{ marginLeft: '5px' }}
          >
            <Icon name="edit" />
          </Button>
          <br />
          {parentAcceptedTaxonNames}
        </div>
      </FieldTemplate>
    )
  }
}

TaxonResult.propTypes = propTypes
TaxonResult.defaultProps = defaultProps

export default compose(
  withI18n(),
  createGetNestedItemById({
    idPath: 'input.value',
    include: [
      'acceptedTaxonName',
      'parent.acceptedTaxonName',
      'parent.parent.acceptedTaxonName',
      'parent.parent.parent.acceptedTaxonName',
      'parent.parent.parent.parent.acceptedTaxonName',
      'parent.parent.parent.parent.parent.acceptedTaxonName',
    ],
    nestedItemKey: 'taxon',
    relationships: [
      'acceptedTaxonName',
      'parent',
      'parent.acceptedTaxonName',
      'parent.parent',
      'parent.parent.acceptedTaxonName',
      'parent.parent.parent',
      'parent.parent.parent.acceptedTaxonName',
      'parent.parent.parent.parent',
      'parent.parent.parent.parent.acceptedTaxonName',
      'parent.parent.parent.parent.parent',
      'parent.parent.parent.parent.parent.acceptedTaxonName',
    ],
    resolveRelationships: ['taxon', 'taxonName'],
    resource: 'taxon',
  })
)(TaxonResult)
