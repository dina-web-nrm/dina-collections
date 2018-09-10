'use strict';

var objectPath = require('object-path');

module.exports = function (_ref) {
  var src = _ref.src,
      target = _ref.target;

  var collectingInformation = objectPath.get(src, 'individual.collectingInformation');
  if (!collectingInformation) {
    return null;
  }

  var collectingLocationN = void 0;
  var collectingLocationT = void 0;
  var collectingPlace = void 0;

  collectingInformation.forEach(function (singleCollectingInformation) {
    var places = objectPath.get(singleCollectingInformation, 'event.locationInformation.places');
    if (places) {
      places.forEach(function (place) {
        if (!collectingPlace) {
          collectingPlace = place.name;
        }
      });
    }

    var locationInformation = objectPath.get(singleCollectingInformation, 'event.locationInformation');

    if (locationInformation && locationInformation.localityI) {
      collectingLocationN = locationInformation.localityI;
    }

    if (locationInformation && locationInformation.localityV) {
      collectingLocationT = locationInformation.localityV;
    }
    return null;
  });

  target.collectingLocation = {
    locationN: collectingLocationN,
    locationT: collectingLocationT,
    place: collectingPlace
  };

  return null;
};