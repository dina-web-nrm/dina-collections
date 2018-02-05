import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

require('jest-localstorage-mock') // eslint-disable-line import/no-extraneous-dependencies

configure({ adapter: new Adapter() })
