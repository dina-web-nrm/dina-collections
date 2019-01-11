/* eslint-disable no-console */
const debug = require('debug')

const priorityMap = require('./priorityMap')

const scopeMessage = (message, scopeLevel) => {
  if (!scopeLevel) {
    return message
  }

  let scopeString = ''
  for (let i = 1; i < scopeLevel; i += 1) {
    scopeString = `${scopeString} |`
  }

  return `${scopeString} └── ${message}`
}

const createLevelLogFunction = ({
  APP_PREFIX,
  context,
  output,
  priority,
  scopeLevel,
}) => {
  const log = debug(`${APP_PREFIX}:${priority}:${context}`)
  if (output === 'log') {
    log.log = console.log.bind(console)
  }
  if (output === 'error') {
    log.log = console.error.bind(console)
  }
  const logFunction = (message, ...rest) => {
    log(scopeMessage(message, scopeLevel), ...rest)
  }

  logFunction.enabled = log.enabled
  return logFunction
}

const consoleGroupAvailable =
  !!console.group && !!console.groupCollapsed && !!console.groupEnd

const createTreeLog = ({
  APP_PREFIX,
  rootScopeLevel = 0,
  logMethods,
  treeMessage,
  context,
}) => {
  const rootNodes = []
  const treeLogName = `${APP_PREFIX}:LOG_DEBUG:${context}`

  const createNode = ({ groupName, parentNodes, scopeLevel }) => {
    const nodes = []
    parentNodes.push({ groupName, nodes, scopeLevel })

    const scope = groupNameInput => {
      return createNode({
        groupName: consoleGroupAvailable && groupNameInput,
        parentNodes: nodes,
        scopeLevel: scopeLevel + 1,
      })
    }

    return Object.keys(priorityMap).reduce(
      (log, level) => {
        return {
          ...log,
          [level]: (message, options) => {
            nodes.push({
              level,
              message: consoleGroupAvailable
                ? message
                : scopeMessage(message, scopeLevel),
              options,
              scopeLevel,
            })
          },
        }
      },
      {
        scope,
      }
    )
  }

  const print = () => {
    if (!logMethods.debug.enabled) {
      return
    }
    const printNodes = currentNodes => {
      currentNodes.forEach(node => {
        const {
          message: nodeMessage,
          nodes: childNodes,
          level,
          options,
          groupName,
        } = node

        if (nodeMessage) {
          if (consoleGroupAvailable) {
            if (options !== undefined) {
              console.log(nodeMessage, options)
            } else {
              console.log(nodeMessage)
            }
          } else {
            logMethods[level](nodeMessage, options)
          }
        } else {
          if (consoleGroupAvailable && groupName) {
            console.group(groupName)
          }

          printNodes(childNodes)
          if (consoleGroupAvailable && groupName) {
            console.groupEnd(groupName)
          }
        }
      })
    }
    printNodes(rootNodes)
  }

  const rootNode = createNode({
    groupName: `${treeLogName} ${treeMessage}`,
    parentNodes: rootNodes,
    scopeLevel: rootScopeLevel + 1,
  })

  return {
    ...rootNode,
    print,
  }
}

module.exports = (APP_PREFIX = 'DINA') => {
  return function createLog(context, scopeLevel = 0) {
    const createScopedLog = () => {
      return createLog(context, scopeLevel + 1)
    }

    const logMethods = Object.keys(priorityMap).reduce((log, level) => {
      const { priority, output } = priorityMap[level]
      return {
        ...log,
        [level]: createLevelLogFunction({
          APP_PREFIX,
          context,
          output,
          priority,
          scopeLevel,
        }),
      }
    }, {})

    return {
      ...logMethods,
      scope: createScopedLog,
      scopeLevel,
      tree: treeMessage => {
        return createTreeLog({
          APP_PREFIX,
          context,
          logMethods,
          priorityMap,
          scopeLevel: scopeLevel + 1,
          treeMessage,
        })
      },
    }
  }
}
