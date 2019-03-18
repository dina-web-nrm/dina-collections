require('console.table')

const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')

const buildRegexp = require('./buildRegexp')

const runTestCases = ({ testCases, storeTestLog }) => {
  testCases.forEach(testCase => {
    const { input, matching = [], notMatching = [], errorMessage } = testCase
    describe(input, () => {
      if (errorMessage) {
        storeTestLog({
          errorMessage,
          input,
          matching: false,
          regexp: '',
        })
        it(`${input} should throw: ${errorMessage || ''}`, () => {
          expect(() => buildRegexp(input)).toThrow(errorMessage)
        })
      } else {
        const regexpString = buildRegexp(input)
        matching.forEach(string => {
          const regexp = new RegExp(regexpString)
          storeTestLog({
            input,
            matching: true,
            regexp: regexpString,
            string,
          })
          it(`${input} is matching: ${string} with regexp: ${regexpString}`, () => {
            expect(regexp.test(string)).toBe(true)
          })
        })
        notMatching.forEach(string => {
          const regexp = new RegExp(regexpString)
          storeTestLog({
            input,
            matching: false,
            regexp: regexpString,
            string,
          })
          it(`${input} is not matching: ${string} regexp: ${regexpString}`, () => {
            expect(regexp.test(string)).toBe(false)
          })
        })
      }
    })
  })
}

const print = false
unitDescribe('searchSpecimen - utilities - buildRegexp', () => {
  const testLog = []
  const storeTestLog = ({ errorMessage, input, matching, regexp, string }) => {
    testLog.push([input, string, matching, regexp, errorMessage])
  }

  afterAll(() => {
    if (print) {
      /* eslint-disable no-console */
      console.table(
        ['input', 'target', 'matching', 'regexp', 'errorMessage'],
        testLog
      )
      /* eslint-enable no-console */
    }
  })
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
    runTestCases({ storeTestLog, testCases })
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
    runTestCases({ storeTestLog, testCases })
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
    runTestCases({ storeTestLog, testCases })
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
    runTestCases({ storeTestLog, testCases })
  })
  describe('asterisk', () => {
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
    runTestCases({ storeTestLog, testCases })
  })
  describe('asterisk and space', () => {
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
    runTestCases({ storeTestLog, testCases })
  })
  describe('asterisk and phrase', () => {
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
    runTestCases({ storeTestLog, testCases })
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
    runTestCases({ storeTestLog, testCases })
  })
})