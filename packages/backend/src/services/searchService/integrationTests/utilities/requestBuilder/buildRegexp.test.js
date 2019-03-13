const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')

const buildRegexp = require('./buildRegexp')

const runTestCases = testCases => {
  testCases.forEach(testCase => {
    const { input, matching = [], notMatching = [], errorMessage } = testCase
    describe(input, () => {
      if (errorMessage) {
        it(`${input} should throw: ${errorMessage || ''}`, () => {
          expect(() => buildRegexp(input)).toThrow(errorMessage)
        })
      } else {
        const regexpString = buildRegexp(input)
        matching.forEach(string => {
          const regexp = new RegExp(regexpString)

          it(`${input} is matching: ${string} with regexp: ${regexpString}`, () => {
            expect(regexp.test(string)).toBe(true)
          })
        })
        notMatching.forEach(string => {
          const regexp = new RegExp(regexpString)
          it(`${input} is not matching: ${string} regexp: ${regexpString}`, () => {
            expect(regexp.test(string)).toBe(false)
          })
        })
      }
    })
  })
}

unitDescribe('searchSpecimen - utilities - buildRegexp', () => {
  describe('No special operators in input', () => {
    const testCases = [
      {
        input: 'pusa',
        matching: ['pusa', 'pusa hispida'],
        notMatching: ['anpusa'],
      },
      {
        input: 'pu',
        matching: ['pusa', 'pusa hispida', 'rhabdomys pumilo'],
        notMatching: ['anpusa', 'test anpusi piu'],
      },
      {
        input: 'c',
        matching: ['alouatta carya', 'capreaolus capreolus'],
        notMatching: ['ac'],
      },
    ]
    runTestCases(testCases)
  })
  describe('Space in input', () => {
    const testCases = [
      {
        input: 'pusa hispida',
        matching: ['pusa hispida', 'hispida pusa'],
        notMatching: ['pus hispida', 'hispid pusa'],
      },
      {
        input: 'pusa  hispida',
        matching: ['pusa hispida', 'hispida pusa'],
        notMatching: ['pus hispida', 'hispid pusa'],
      },
      {
        input: 'mu mus',
        // Note matching 'mustela erminea' is not ideal
        matching: ['mus musculoides', 'mustela erminea'],
      },
    ]
    runTestCases(testCases)
  })
  describe('= in input', () => {
    const testCases = [
      {
        input: '=pusa',
        matching: ['pusa'],
        notMatching: ['pusan'],
      },
      {
        input: '=pu',
        notMatching: ['pusa'],
      },
      {
        input: '=',
        matching: [''],
        notMatching: ['pusan', 'c'],
      },
    ]
    runTestCases(testCases)
  })
  describe('phrases', () => {
    const testCases = [
      {
        input: '"pusa hispida"',
        matching: ['pusa hispida'],
        notMatching: ['pusa', 'hispida pusa'],
      },
      {
        input: '"pusa hisp"',
        notMatching: ['pusa hispida', 'pusa', 'hispida pusa'],
      },
      {
        input: '"hispida pusa"',
        notMatching: ['pusa hispida', 'pusa'],
      },
      {
        errorMessage: 'expected 2 " but got 1',
        input: '"hispida pusa',
      },
    ]
    runTestCases(testCases)
  })
  describe('asterisc', () => {
    const testCases = [
      {
        input: 'pu*',
        matching: ['pusa', 'pusa hispida'],
        notMatching: ['hispida'],
      },
      {
        input: '*pida',
        matching: ['pusa hispida', 'hispida pusa'],
        notMatching: ['pusa'],
      },
      {
        input: '*lo*',
        matching: ['gulo gulo', 'Mus musculoides', 'Gulo'],
        notMatching: ['pusa hispida', 'pusa'],
      },
      {
        errorMessage: '** is not allowed',
        input: '**',
        shouldThrow: true,
      },
    ]
    runTestCases(testCases)
  })
  describe('asterisc and space', () => {
    const testCases = [
      {
        input: '*lo* mus',
        matching: ['mus musculoides'],
        notMatching: ['mus'],
      },
      {
        input: 'mus *lo*',
        matching: ['mus musculoides'],
        notMatching: ['mus'],
      },
      {
        input: 'mus *lo',
        matching: [],
        notMatching: ['mus', 'mus musculoides'],
      },
    ]
    runTestCases(testCases)
  })
  describe('asterisc and phrase', () => {
    const testCases = [
      {
        input: '"mus *lo*"',
        matching: ['mus musculoides'],
        notMatching: ['musculoides mus'],
      },
      {
        input: '"*lo* mus"',
        matching: [],
        notMatching: ['mus', 'mus musculoides'],
      },
    ]
    runTestCases(testCases)
  })
  describe('invalid input', () => {
    const testCases = [
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
        input: '/',
      },
    ]
    runTestCases(testCases)
  })
})
