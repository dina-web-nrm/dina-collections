const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const getCurrentTime = () => {
  return new Date().toISOString()
}

const buildLinkContentArray = ({ name, rootRelativePath, trees }) => {
  return trees
    .filter(({ name: treeName }) => {
      return treeName !== name
    })
    .map(tree => {
      const relative = path.relative(rootRelativePath, tree.rootRelativePath)
      return `[${tree.name}](${relative}/tree.md)`
    })
}

const createCmd = ({ relativePath, levels }) => {
  return `tree ${relativePath} -L ${levels} -I node_modules`
}

const buildTreeContentArray = ({ levels, relativePath }) => {
  return new Promise((resolve, reject) => {
    const cmd = createCmd({ levels, relativePath })
    exec(cmd, (err, tree) => {
      if (err) {
        return reject(err)
      }
      const lines = tree.split('\n')
      lines.splice(0, 1)
      lines.splice(-2, 2)
      const treeContentArray = ['```bash', lines.join('\n'), '```']

      return resolve(treeContentArray)
    })
  })
}

const buildTreeDocumentation = ({
  rootPath,
  levels,
  name,
  rootRelativePath,
  trees,
}) => {
  const relativePath = path.join(rootPath, rootRelativePath)
  return buildTreeContentArray({
    levels,
    relativePath,
  }).then(treeContentArray => {
    const treeLinks = buildLinkContentArray({ name, rootRelativePath, trees })
    const currentTime = getCurrentTime()

    const fileContent = [
      `# Tree for ${name}`,
      `Generated at: ${currentTime}`,
      '## Tree',
      ...treeContentArray,
      '',
      '## Links',
      ...treeLinks,
    ].join('\n')

    const filePath = path.join(relativePath, 'tree.md')
    fs.writeFileSync(filePath, fileContent, 'utf8')
  })
}

module.exports = function buildFileTrees({ rootPath, trees }) {
  trees.forEach(tree => {
    buildTreeDocumentation({ rootPath, trees, ...tree })
  })
}
