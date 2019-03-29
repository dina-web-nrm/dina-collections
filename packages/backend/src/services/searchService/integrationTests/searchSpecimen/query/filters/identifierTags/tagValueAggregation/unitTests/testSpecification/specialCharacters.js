module.exports = [
  {
    input: '1; 4406; 52',
    matching: ['1; 4406; 52'],
    notMatching: ['1; 4406;'],
  },
  {
    input: 'v0253/98',
    matching: ['v0253/98'],
    notMatching: ['v0253 98'],
  },
  {
    input: '1;',
    matching: ['1; 4406', '1; 4406; 52'],
  },
  {
    input: '*-*',
    matching: ['2012-21'],
  },
  {
    input: '*/*',
    matching: ['v0253/98', 'v0615/98'],
  },
  {
    input: '*,*',
    matching: ['1,285', 'bly 45, 1008, 3124', '1,285'],
  },
  {
    input: '" "',
    matching: ['1; 4406', 'bly 45, 1008, 3124', '1; 4406; 52'],
    notMatching: ['a'],
  },
  {
    input: ' ',
    notMatching: ['a'],
  },

  {
    input: '*?*',
    matchingNotInSampleData: ['a; ?a'],
  },
  {
    input: '*.*',
    matchingNotInSampleData: ['an.de '],
  },
]
