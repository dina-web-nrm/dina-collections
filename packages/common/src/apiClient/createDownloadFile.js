module.exports = function createDownloadFile(apiConfig) {
  return function downloadFile({ fileUrl, fileName }) {
    const anchor = document.createElement('a')

    const headers = apiConfig.mapHeaders({})
    return fetch(fileUrl, { headers })
      .then(response => response.blob())
      .then(blobby => {
        const objectUrl = window.URL.createObjectURL(blobby)

        anchor.href = objectUrl
        anchor.download = fileName
        anchor.click()

        window.URL.revokeObjectURL(objectUrl)
      })
  }
}
