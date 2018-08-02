const testData = {}

testData.itemPersonWithoutId = [
  { attributes: { firstName: 'Alan', lastName: 'Turing' } },
]
testData.itemPersonWithId = [
  { attributes: { firstName: 'Alan', lastName: 'Turing' }, id: '224' },
  { attributes: { firstName: 'Ada', lastName: 'Lovelace' }, id: '123' },
  { attributes: { firstName: 'Elon', lastName: 'Musk' }, id: '883' },
]

testData.itemPersonWithIdAndRelationships = [
  {
    attributes: { firstName: 'Alan', lastName: 'Turing' },
    id: '224',
    relationships: { children: { data: [{ id: '1234', type: 'child' }] } },
  },
]

testData.itemPersonWithIdVersions = [
  { attributes: { firstName: 'Alan', lastName: 'Turing' }, id: '224' },
  {
    attributes: {
      changedLastnameTimes: 1,
      firstName: 'Alan',
      lastName: 'Lovelace',
    },
    id: '224',
  },
  {
    attributes: {
      changedLastname: 2,
      firstName: 'Alan',
      lastName: 'Musk',
    },
    id: '224',
  },
]

testData.itemPersonWithIdAndRelationshipsVersions = [
  {
    attributes: { firstName: 'Alan', lastName: 'Turing' },
    id: '224',
    relationships: { children: { data: [{ id: '1234', type: 'child' }] } },
  },
  {
    attributes: {
      changedLastnameTimes: 1,
      firstName: 'Alan',
      lastName: 'Lovelace',
    },
    id: '224',
    relationships: {
      parent: { data: [{ id: '222', type: 'parent' }] },
    },
  },
  {
    attributes: {
      changedLastname: 2,
      firstName: 'Alan',
      lastName: 'Musk',
    },
    id: '224',
    relationships: {
      children: { data: [{ id: '1235', type: 'child' }] },
      parent: { data: [{ id: '221', type: 'parent' }] },
    },
  },
]

module.exports = {
  getTestData: (key, index = 0) => {
    const data = testData[key][index]
    if (!data) {
      throw new Error(`Test data not found for key: ${key} and index: ${index}`)
    }
    return JSON.parse(JSON.stringify(testData[key][index]))
  },
}
