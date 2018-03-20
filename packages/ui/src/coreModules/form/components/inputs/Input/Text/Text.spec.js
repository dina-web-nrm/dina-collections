/* eslint-disable no-console, prefer-destructuring */
import uiDescribe from 'utilities/test/uiDescribe'
import createInputTest from 'coreModules/form/utilities/createInputTest'
import TextInput from './index'

uiDescribe('coreModules/form/components/inputs/input/Text', () => {
  createInputTest({ InputComponent: TextInput })
})
