module.exports = function applyHooks({ hooks, ...rest }) {
  const hookPromises = hooks.map(postHook => {
    return postHook({
      ...rest,
    })
  })

  return Promise.all(hookPromises)
}
