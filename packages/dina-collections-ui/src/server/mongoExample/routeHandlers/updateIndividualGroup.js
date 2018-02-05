/* eslint-disable no-underscore-dangle, no-console, no-param-reassign */

module.exports = function updateIndividualGroup({ controllers, request }) {
  const { Record } = controllers
  const { pathParams = {} } = request
  const { id } = pathParams

  const individualGroup = request.body.data.attributes

  return Record.findOne({ _id: id }).then(existingRecord => {
    if (!existingRecord) {
      throw new Error(`Record with id ${id} dont exists`)
    }

    existingRecord.set({
      ...individualGroup,
    })

    return existingRecord.save().then(({ _id }) => {
      return Record.findById(_id).then(res => {
        const jsonResult = res.toJSON()
        delete jsonResult._id
        delete jsonResult.catalogedUnit
        delete jsonResult.__v
        return {
          data: {
            data: {
              attributes: {
                ...jsonResult,
              },
              id,
            },
          },
        }
      })
    })
  })
}
