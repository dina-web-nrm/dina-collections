/* eslint-disable no-param-reassign */

module.exports = function migrateDetermination({ src, target, migrator }) {
  const determinedByAgentText = migrator.getValue({
    obj: src,
    path: 'objects.DeterminedBy(DET)',
    strip: true,
  })

  const year = migrator.getValue({
    obj: src,
    path: 'objects.Det_Year',
    strip: true,
  })
  const month = migrator.getValue({
    obj: src,
    path: 'objects.Det_Month',
    strip: true,
  })
  const day = migrator.getValue({
    obj: src,
    path: 'objects.Det_Day',
    strip: true,
  })

  if (year) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.determination.0.date.year',
      value: year,
    })
  }
  if (month) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.determination.0.date.month',
      value: month,
    })
  }
  if (day) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.determination.0.date.day',
      value: day,
    })
  }

  if (determinedByAgentText) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.determination.determinedByAgent.textI',
      value: determinedByAgentText,
    })
  }
}
