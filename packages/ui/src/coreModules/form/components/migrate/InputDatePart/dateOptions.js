export const days = []
export const months = []
export const years = []
const currentYear = new Date().getFullYear()

// A string key and title is needed for Semantic UI Search component
// (and it is not possible to call it "value" instead)
for (let day = 1; day <= 31; day += 1) {
  days.push(String(day))
}

for (let month = 1; month <= 12; month += 1) {
  months.push(String(month))
}

for (let year = 1500; year <= currentYear; year += 1) {
  years.push(String(year))
}
