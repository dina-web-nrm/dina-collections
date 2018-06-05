module.exports = ({ relationshipModel, targetAs }) => {
  return relationshipModel
    ? [
        {
          as: targetAs,
          model: relationshipModel.Model,
        },
      ]
    : undefined
}
