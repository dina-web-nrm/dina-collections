/* eslint-disable no-console, prefer-destructuring */
import uiDescribe from 'utilities/test/uiDescribe'
import createInputTest from 'coreModules/form/utilities/createInputTest'
import TextArea from './index'

uiDescribe('coreModules/form/components/inputs/TextArea', () => {
  createInputTest({ elementToSelect: 'textarea', InputComponent: TextArea })
})
