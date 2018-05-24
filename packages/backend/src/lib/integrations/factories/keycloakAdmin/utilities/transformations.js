exports.transformUser = ({ id, username, email }) => {
  return {
    document: {
      email,
      username,
    },
    id,
  }
}

exports.transformUsers = users => {
  return users.map(exports.transformUser)
}
