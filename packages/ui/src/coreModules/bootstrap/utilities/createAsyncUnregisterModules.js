/* not used atm
* use in enhancer like:
*    const registerModulesAsync = dep.createAsyncRegisterModules({
*      getModuleRegisterPipe,
*      registerModules,
*      setModuleRegisterPipe,
*    })
*
*/

export default function createAsyncUnregisterModules({
  getModuleRegisterPipe,
  getModuleUnregisterPipe,
  setModuleUnregisterPipe,
  unregisterModules,
}) {
  return function asyncUnregisterModules(modules) {
    const moduleUnregisterPipe = getModuleUnregisterPipe()
    const moduleRegisterPipe = getModuleRegisterPipe()
    if (moduleUnregisterPipe.length) {
      moduleUnregisterPipe.push(
        modules.filter(module => {
          return (
            moduleUnregisterPipe.some(pipeModule => {
              return pipeModule.name === module.name
            }) ||
            moduleRegisterPipe.some(pipeModule => {
              return pipeModule.name === module.name
            })
          )
        })
      )
    } else {
      moduleUnregisterPipe.push(...modules)
    }

    return new Promise(resolve => {
      setTimeout(() => {
        if (moduleUnregisterPipe.length) {
          unregisterModules(moduleUnregisterPipe)
          setModuleUnregisterPipe([])
        }
        resolve(true)
      }, 0)
    })
  }
}
