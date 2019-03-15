Cypress.Commands.overwrite('url', (originalFn, options = {}) => {
  return originalFn({
    timeout: 10000,
    ...options,
  })
})
