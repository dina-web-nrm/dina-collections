import applyMutationMountedForm from './applyMutationMountedForm'
import createMountedForm from './createMountedForm'
import submitMountedForm from './submitMountedForm'
import createMutation from './createMutation'

export default function runFormScenarios({
  FormComponent,
  formName,
  mount,
  scenarios,
  transformInput,
  transformOutput,
}) {
  let create
  let applyMutation
  let submit
  if (mount) {
    create = createMountedForm
    applyMutation = applyMutationMountedForm
    submit = submitMountedForm
  } else {
    throw new Error('Running scenarios without mounting is not yet supported')
  }

  describe(`Run form scenario for ${formName}:`, () => {
    scenarios.forEach(scenario => {
      const {
        expectedOutput,
        expectFormSubmitSuccess = true,
        formOptions,
        input = {},
        mutations = [],
        description,
        postSubmitTest,
        postTransformOutputTest,
        preSubmitTest,
      } = scenario
      describe(`${description}`, () => {
        let formInitialValues
        it('Transform input', () => {
          expect(() => {
            formInitialValues = transformInput(input)
          }).not.toThrow()
        })

        let formWrapper
        it('Created form', () => {
          expect(() => {
            formWrapper = create({
              FormComponent,
              formInitialValues,
              formName,
              formOptions,
            })
          }).not.toThrow()
        })
        describe(`Applies mutation:`, () => {
          mutations.forEach(mutationInput => {
            const mutation = createMutation(mutationInput)

            it(`${mutation.name}`, () => {
              expect(() => {
                applyMutation({
                  formWrapper,
                  mutation,
                })
              }).not.toThrow()
            })
          })
        })

        if (preSubmitTest) {
          it(`Run preSubmitTest:`, () => {
            preSubmitTest({ formWrapper })
          })
        }

        describe('Submit:', () => {
          let submitResult
          beforeAll(() => {
            submitResult = submit(formWrapper)
          })
          if (postSubmitTest) {
            it('Run postSubmitTest:', () => {
              postSubmitTest({ formWrapper, submitResult })
            })
          }

          if (expectFormSubmitSuccess) {
            it('Submit success as expected', () => {
              expect(submitResult.submitFailed).toBeFalsy()
            })
            it('No sync errors as expected', () => {
              expect(submitResult.syncErrors).toBeFalsy()
            })
          } else {
            it('Submit failed as expected', () => {
              expect(submitResult.submitFailed).toBeTruthy()
            })

            it('Sync errors as expected', () => {
              expect(submitResult.syncErrors).toBeTruthy()
            })
          }

          let transformedOutput
          it('Transform output', () => {
            expect(() => {
              transformedOutput = transformOutput(submitResult.values)
            }).not.toThrow()
          })
          if (expectedOutput) {
            it('Form output equals expected output', () => {
              expect(transformedOutput).toEqual(expectedOutput)
            })
          }
          if (postTransformOutputTest) {
            it('Run postSubmitTest:', () => {
              postTransformOutputTest({
                formWrapper,
                submitResult,
                transformedOutput,
              })
            })
          }
        })
      })
    })
  })
}
