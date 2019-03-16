module.exports = [
  {
    input: 'bergman',
    matching: ['bergman'],
    notMatching: ['anpusa'],
  },
  {
    input: 'berg',
    matching: ['bergman', 'bergström, ulf'],
    notMatching: ['ber'],
  },
  {
    input: 'ulf',
    matching: ['bergström, ulf'],
    notMatching: ['bergström'],
  },
]
