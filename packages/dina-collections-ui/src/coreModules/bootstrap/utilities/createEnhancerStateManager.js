export default function createEnhancerStateManager(initialState) {
  const state = {
    availableModules: [],
    dispatch: null,
    moduleRegisterPipe: [],
    moduleState: {},
    moduleUnregisterPipe: [],
    ...initialState,
  }

  return {
    getAvailableModules: () => {
      return state.availableModules
    },
    getDispatch: () => {
      return state.dispatch
    },
    getModuleRegisterPipe: () => {
      return state.moduleRegisterPipe
    },
    getModuleState: () => {
      return state.moduleState
    },
    getModuleUnregisterPipe: () => {
      return state.moduleUnregisterPipe
    },
    setAvailableModules: newAvailableModules => {
      state.availableModules = newAvailableModules
    },
    setDispatch: newDispatch => {
      state.dispatch = newDispatch
    },
    setModuleRegisterPipe: newModuleRegisterPipe => {
      state.moduleRegisterPipe = newModuleRegisterPipe
    },
    setModuleState: newModuleState => {
      state.moduleState = newModuleState
    },
    setModuleUnregisterPipe: newModuleUnregisterPipe => {
      state.moduleUnregisterPipe = newModuleUnregisterPipe
    },
  }
}
