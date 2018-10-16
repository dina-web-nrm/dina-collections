import wrapReduxFormFieldParts from 'coreModules/form/utilities/wrapReduxFormFieldParts'

import Checkbox from '../../fields/Checkbox'
import Input from '../../fields/Input'
import Radio from '../../fields/Radio'
import RangeDate from '../../fields/Date/RangeDate'
import Remarks from '../../fields/Remarks'
import SingleDate from '../../fields/Date/SingleDate'
import TextArea from '../../fields/TextArea'

export default wrapReduxFormFieldParts({
  Checkbox,
  Input,
  Radio,
  RangeDate,
  Remarks,
  SingleDate,
  TextArea,
})
