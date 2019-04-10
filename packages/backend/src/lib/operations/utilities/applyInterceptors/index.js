const asyncReduce = require('common/src/asyncReduce')

module.exports = function applyInterceptors({
  interceptors,
  request: originalRequest,
  ...rest
}) {
  return asyncReduce({
    initialValue: { request: originalRequest },
    items: interceptors,
    reduceFunction: ({ item: interceptor, value }) => {
      return interceptor({
        ...rest,
        ...value,
      }).then(({ request, ...output }) => {
        if (!request) {
          throw new Error('Interceptor is supposed to return request')
        }
        return {
          request,
          ...output,
        }
      })
    },
  })
}
