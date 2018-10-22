module.exports = function createUser({ authActive, token }) {
  if (!authActive) {
    return {
      email: 'test@example.com',
      id: 'test-id',
      name: 'Test User',
    }
  }

  if (!token) {
    return {
      name: 'UNKNOWN',
    }
  }

  return {
    email: token.email,
    id: token.sub,
    name: token.name,
  }
}
