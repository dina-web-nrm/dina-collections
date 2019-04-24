const documentation = require('documentation')
const path = require('path')
const fs = require('fs')
const getLocalRootFullPath = require('../utilities/getLocalRootFullPath')

const COMMENT_START = '<!---'
const COMMENT_END = '-->'
const IMPORT_FILE_PATH_STRING = 'import-file-src:'
const IMPORT_FILE_END_STRING = 'import-file-end'
const PROCESSOR_STRING = 'processor:'

function promiseMap(array, fn) {
  return Promise.resolve(
    array.reduce((promise, value) => {
      return promise.then(() => {
        return Promise.resolve(fn(value))
      })
    }, Promise.resolve(null))
  )
}

const lineIsComment = line => {
  return line.includes(COMMENT_START) && line.includes(COMMENT_END)
}

const lineIsProcessor = line => {
  return lineIsComment(line) && line.includes(PROCESSOR_STRING)
}

const lineContainsImportDirective = line => {
  return lineIsComment(line) && line.includes(IMPORT_FILE_PATH_STRING)
}

const getPreprocessorAndArgFromLine = line => {
  const preprocessorSegments = line
    .replace(COMMENT_START, '')
    .replace(PROCESSOR_STRING, '')
    .replace(COMMENT_END, '')
    .split(' ')
    .join('')
    .split(':')

  if (preprocessorSegments.length === 1) {
    return {
      name: preprocessorSegments[0],
    }
  }

  return {
    arg: preprocessorSegments[1],
    name: preprocessorSegments[0],
  }
}

const lineApply = (content, fn) => {
  return Promise.resolve().then(() => {
    const lines = content.split('\n')
    const updatedLines = []
    const pushLine = line => {
      updatedLines.push(line)
    }

    return promiseMap(lines, line => {
      return fn({ line, pushLine })
    }).then(() => {
      return updatedLines
        .filter(line => {
          return line !== undefined
        })
        .join('\n')
    })
  })
}

const processors = {
  'extract-js-doc': ({ replaceSectionSrcFullPath }) => {
    return documentation
      .build([replaceSectionSrcFullPath], { shallow: true })
      .then(res => {
        return documentation.formats.md(res, { noReferenceLinks: true })
      })
  },
  'heading-increment-level': ({ content, arg }) => {
    if (!arg) {
      throw new Error('Arg is required for processor: heading-increment-level')
    }
    const argMatchMap = {
      '1': '#',
      '2': '##',
      '3': '###',
      '4': '####',
      '5': '#####',
    }
    const argMatch = argMatchMap[arg]

    if (!argMatch) {
      throw new Error(
        `Arg has to be one of: [${Object.keys(argMatchMap).join(', ')}] `
      )
    }

    return lineApply(content, ({ line, pushLine }) => {
      if (line.includes('# ') && line.indexOf('#') === 0) {
        pushLine(line.replace('# ', `${argMatch}# `))
      } else {
        pushLine(line)
      }
    })
  },
  'heading-remove-level': ({ content, arg }) => {
    const argMatchMap = {
      '1': '# ',
      '2': '## ',
      '3': '### ',
      '4': '#### ',
      '5': '##### ',
    }

    if (!arg) {
      throw new Error('Arg is required for processor: heading-remove-level')
    }

    const argMatch = argMatchMap[arg]

    if (!argMatch) {
      throw new Error(
        `Arg has to be one of: [${Object.keys(argMatchMap).join(', ')}] `
      )
    }
    return lineApply(content, ({ line, pushLine }) => {
      if (line.indexOf(argMatch) !== 0) {
        return pushLine(line)
      }
      return null
    })
  },
  'wrap-in-js-code-block': ({ content }) => {
    return ['```js', content, '```'].join('\n')
  },
}

const processFileContent = ({
  content,
  processorObjects,
  replaceSectionSrcFullPath,
}) => {
  if (processorObjects.length === 0) {
    return Promise.resolve(content)
  }

  let processedContent = content
  return promiseMap(processorObjects, ({ name, arg }) => {
    const processorFunction = processors[name]
    if (!processorFunction) {
      throw new Error(`Unknown processor with name: ${name}`)
    }
    return Promise.resolve()
      .then(() => {
        return processorFunction({
          arg,
          content: processedContent,
          replaceSectionSrcFullPath,
        })
      })
      .then(updatedContent => {
        processedContent = updatedContent
      })
  }).then(() => {
    return processedContent
  })
}

const getImportRelativePathFromLine = line => {
  return line
    .replace(COMMENT_START, '')
    .replace(IMPORT_FILE_PATH_STRING, '')
    .replace(COMMENT_END, '')
    .split(' ')
    .join('')
}

const lineIsImportEnd = line => {
  return lineIsComment(line) && line.includes(IMPORT_FILE_END_STRING)
}

const getFullPath = relativePath => {
  const rootPath = getLocalRootFullPath()
  return path.join(rootPath, relativePath)
}

const readImportFileContent = fullPath => {
  return fs.readFileSync(fullPath, 'utf8')
}

const createImportComment = replaceSectionSrcPath => {
  return [
    COMMENT_START,
    `This content is imported from ${replaceSectionSrcPath} using interpolateFiles script.`,
    `Edits between this comment and ${IMPORT_FILE_END_STRING} will be replaced when interpolateFiles script is run.`,
    COMMENT_END,
    '',
  ].join('\n')
}

const contentContainsInterpolations = content => {
  return (
    content.includes(IMPORT_FILE_PATH_STRING) &&
    content.includes(IMPORT_FILE_END_STRING)
  )
}

const interpolateContent = ({ content, removeInterpolations }) => {
  let processorObjects = []
  let replaceSectionSrcRelativePath
  let containsUpdatedImport = false

  return lineApply(content, ({ line, pushLine }) => {
    return Promise.resolve()
      .then(() => {
        if (replaceSectionSrcRelativePath && lineIsImportEnd(line)) {
          if (removeInterpolations) {
            replaceSectionSrcRelativePath = undefined
            containsUpdatedImport = true
            return null
          }
          const replaceSectionSrcFullPath = getFullPath(
            replaceSectionSrcRelativePath
          )
          const importFileContent = readImportFileContent(
            replaceSectionSrcFullPath
          )
          return processFileContent({
            content: importFileContent,
            processorObjects,
            replaceSectionSrcFullPath,
          }).then(processedFileContent => {
            pushLine(createImportComment(replaceSectionSrcRelativePath))
            pushLine(processedFileContent)
            pushLine('\n')
            replaceSectionSrcRelativePath = undefined
            containsUpdatedImport = true
          })
        }
        return null
      })
      .then(() => {
        if (!replaceSectionSrcRelativePath) {
          pushLine(line)
        }

        if (lineIsProcessor(line)) {
          pushLine(line)
          processorObjects.push(getPreprocessorAndArgFromLine(line))
        }

        if (lineContainsImportDirective(line)) {
          processorObjects = []
          replaceSectionSrcRelativePath = getImportRelativePathFromLine(line)
        }
      })
  }).then(updatedContent => {
    if (containsUpdatedImport) {
      return updatedContent
    }
    return content
  })
}

const ensureValidFileType = filePath => {
  if (path.extname(filePath) !== '.md') {
    throw new Error(`Invalid file type for: ${filePath}. Only .md supported`)
  }
}

exports.interpolateFile = ({
  filePath,
  print,
  removeInterpolations,
  write,
}) => {
  ensureValidFileType(filePath)
  const content = fs.readFileSync(filePath, 'utf8')
  return interpolateContent({ content, removeInterpolations }).then(
    updatedContent => {
      const isUpdated = content !== updatedContent
      if (!isUpdated) {
        console.log(`No changes in: ${filePath}`)
        return
      }
      if (print) {
        console.log(updatedContent)
      }

      if (write) {
        console.log(`Updated ${filePath}`)
        fs.writeFileSync(filePath, updatedContent, 'utf8')
      }
    }
  )
}

exports.fileContainsInterpolations = ({ filePath }) => {
  ensureValidFileType(filePath)
  const content = fs.readFileSync(filePath, 'utf8')
  return contentContainsInterpolations(content)
}
