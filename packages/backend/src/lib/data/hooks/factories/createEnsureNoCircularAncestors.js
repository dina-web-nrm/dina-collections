module.exports = function createRegisterResourceActivityHook({
  request,
  resource,
  serviceInteractor,
}) {
  return Promise.resolve().then(() => {
    const { body: { data }, pathParams: { id } } = request
    const parentId = data && data.id

    return serviceInteractor
      .getMany({
        request: {
          queryParams: {
            filter: {
              ancestorsToId: parentId,
            },
          },
        },
        resource,
      })
      .then(({ data: ancestors }) => {
        console.log('ancestors', ancestors)
      })
  })
}
