export default function downloadFile({ fileUrl, fileName }) {
  return (dispatch, getState, { apiClient }) => {
    return apiClient.downloadFile({
      fileName,
      fileUrl,
    })
  }
}
