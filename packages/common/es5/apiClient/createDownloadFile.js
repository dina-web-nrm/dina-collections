'use strict';

module.exports = function createDownloadFile(apiConfig) {
  return function downloadFile(_ref) {
    var fileUrl = _ref.fileUrl,
        fileName = _ref.fileName;

    var anchor = document.createElement('a');

    var headers = apiConfig.mapHeaders({});
    return fetch(fileUrl, { headers: headers }).then(function (response) {
      return response.blob();
    }).then(function (blobby) {
      var objectUrl = window.URL.createObjectURL(blobby);

      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
    });
  };
};