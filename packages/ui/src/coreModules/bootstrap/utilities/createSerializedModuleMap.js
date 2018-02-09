export default function createSerializedModuleMap(modules) {
  return modules.reduce((obj, module) => {
    return {
      ...obj,
      [module.name]: {
        actionTypes: module.actionTypes,
        constants: module.constants,
        markdown: module.markdown,
        name: module.name,
        notifications: module.notifications,
        shortcuts: module.shortcuts,
        translations: module.translations,
      },
    }
  }, {})
}
