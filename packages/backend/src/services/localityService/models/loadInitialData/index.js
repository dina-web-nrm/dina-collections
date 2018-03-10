const continents = [
  'africa',
  'antarctica',
  'arctic ocean',
  'asia',
  'atlantic ocean',
  'australia',
  'europe',
  'north america',
  'oceania',
  'pacific ocean',
  'south america',
].map(name => {
  return {
    group: 'continent',
    name,
  }
})

const countries = ['algeria', 'angola', 'antarctica', 'sweden'].map(name => {
  return {
    group: 'country',
    name,
  }
})

const provinces = [
  'balearic islands',
  'adana',
  'ahvenanmaa',
  'akershus',
  'alaska',
  'alberta',
  'alsace',
  'altai',
  'altaiskiy kray',
].map(name => {
  return {
    group: 'province',
    name,
  }
})

const districts = [
  'gaspã© peninsula',
  'algoma district',
  'alnã¶',
  'archipelago',
  'arjeplog',
  'arjeplogs kommun',
  'arvidsjaur kommun',
].map(name => {
  return {
    group: 'district',
    name,
  }
})

module.exports = function loadInitialData({ models }) {
  const curatedLocalities = [
    ...continents,
    ...countries,
    ...provinces,
    ...districts,
  ].map(({ name, group }, id) => {
    return {
      group,
      id,
      name,
    }
  })
  const { create } = models.curatedLocality
  const promises = curatedLocalities.map(curatedLocality => {
    const { id, ...rest } = curatedLocality
    return create(rest, id)
  })
  return Promise.all(promises)
}
