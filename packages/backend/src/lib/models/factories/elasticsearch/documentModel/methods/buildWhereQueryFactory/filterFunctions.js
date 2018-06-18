const raw = ({ value }) => {
  return value
}

const matchCollectingLocation = ({ value }) => {
  return {
    match_phrase: {
      collectingLocations: {
        query: value,
      },
    },
  }
}

const matchIdentifier = ({ value }) => {
  return {
    match_phrase: {
      identifiers: {
        query: value,
      },
    },
  }
}

module.exports = {
  matchCollectingLocation,
  matchIdentifier,
  raw,
}
