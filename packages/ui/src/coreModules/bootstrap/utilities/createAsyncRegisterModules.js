/* not used atm
* use in enhancer like:
*    const unregisterModulesAsync = dep.createAsyncUnregisterModules({
*      getModuleRegisterPipe,
*      getModuleUnregisterPipe,
*      setModuleUnregisterPipe,
*      unregisterModules,
*    })
*
*/

export default function createAsyncRegisterModules({
  getModuleRegisterPipe,
  registerModules,
  setModuleRegisterPipe,
}) {
  return function asyncRegisterModules(modules) {
    const moduleRegisterPipe = getModuleRegisterPipe()
    if (moduleRegisterPipe.length) {
      const filteredModules = modules.filter(module => {
        return moduleRegisterPipe.some(pipeModule => {
          return pipeModule.name === module.name
        })
      })
      moduleRegisterPipe.push(...filteredModules)
    } else {
      moduleRegisterPipe.push(...modules)
    }
    return new Promise(resolve => {
      setTimeout(() => {
        if (moduleRegisterPipe.length) {
          registerModules(moduleRegisterPipe)
          setModuleRegisterPipe([])
        }
        resolve(true)
      }, 0)
    })
  }
}
