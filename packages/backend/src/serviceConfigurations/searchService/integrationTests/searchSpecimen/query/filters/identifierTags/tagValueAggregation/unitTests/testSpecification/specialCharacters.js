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
    input: '*.*',
    matchingNotInSampleData: [
      'M.532',
      '10. 10. 599',
      '4.5',
      'H.63',
      '3.5',
      '2.S',
      '5.S.',
    ],
  },

  {
    input: '*(*',
    matchingNotInSampleData: ['an(de)', 'a(', '('],
  },
  {
    input: '*)*',
    matchingNotInSampleData: ['an(de)', 'a)', ')'],
  },
  {
    input: '*:*',
    matchingNotInSampleData: [
      'B:V2, H4',
      'I:42,1902',
      '2:3,3  695',
      'Field no: NRM-204',
      'Field no: NRM-206',
    ],
  },
  {
    input: '*;*',
    matching: ['1; 4406', '1; 4406; 52'],
  },
  {
    input: '*#*',
    matchingNotInSampleData: ['1983-231 Lab # 1194'],
  },
  {
    input: '*?*',
    matchingNotInSampleData: ['6005?'],
  },
  {
    input: '*>*',
    matchingNotInSampleData: ['> 4934', '> 1107'],
  },
  {
    input: '*<*',
    matchingNotInSampleData: ['< 4934', '< 1107'],
  },
  {
    input: '?',
    matchingNotInSampleData: ['?', '?test'],
    notMatching: ['a'],
  },
]
