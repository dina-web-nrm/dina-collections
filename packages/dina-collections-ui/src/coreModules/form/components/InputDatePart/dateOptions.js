export const days = []
export const months = []
export const years = []
const currentYear = new Date().getFullYear()

/* eslint-disable no-plusplus */
// A string key is needed for Semantic-UI Search component
for (let day = 1; day <= 31; day++) {
  days.push({ key: String(day), value: day })
}

for (let month = 1; month <= 12; month++) {
  months.push({ key: String(month), value: month })
}

for (let year = currentYear; year >= 1500; year--) {
  years.push({ key: String(year), value: year })
}
/* eslint-enable no-plusplus */
