module.exports = [
  {
    errorMessage: 'not allowed to combine = and *',
    input: '=mus*',
  },
  {
    errorMessage: 'not allowed to combine = and ',
    input: '="mus"',
  },
  {
    errorMessage: 'input contains invalid characters',
    input: '+',
  },
  {
    errorMessage: 'input contains invalid characters',
    input: '.',
  },
]
