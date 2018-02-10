export const findNodes = ({ form, id, name, selector }) => {
  if (selector) {
    return selector({ form, id, name })
  }
  if (id) {
    return form.find({ id }).hostNodes()
  }

  return form.find({ name }).hostNodes()
}

export default function simulateFormFieldChanges(
  mountedComponent,
  commands = []
) {
  commands.forEach(
    ({ id, interaction = 'setValue', name, selector, value }) => {
      const form = mountedComponent.find('form')
      const nodes = findNodes({ form, id, name, selector })

      if (nodes.length !== 1) {
        throw new Error(`${nodes.length} nodes found for field: ${name}`)
      }

      switch (interaction) {
        case 'setValue': {
          nodes.simulate('change', { target: { value } })
          break
        }
        case 'click': {
          nodes.simulate('click')
          break
        }
        default: {
          throw new Error(`Unknown interaction ${interaction}`)
        }
      }
    }
  )
}
