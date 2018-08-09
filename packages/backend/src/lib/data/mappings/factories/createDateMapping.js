module.exports = function createDateMapping({
  fieldPath,
  format = 'timestamp',
}) {
  let elasticFormat
  if (format === 'timestamp') {
    elasticFormat = 'date_time'
  }

  if (format === 'ymd') {
    elasticFormat = 'year_month_day'
  }

  if (!elasticFormat) {
    throw new Error(`Unknown date format: ${format}`)
  }

  return {
    elasticsearch: () => {
      return {
        format: elasticFormat,
        type: 'date',
      }
    },
    fieldPath,
  }
}
