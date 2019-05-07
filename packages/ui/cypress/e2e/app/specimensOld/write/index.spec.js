import create from './create'
import edit from './edit'
import validate from './validate'
import remove from './remove'

describe('Specimens write operations', () => {
  // resetting db and search is done in each file

  create()
  edit()
  remove()
  validate()
})
