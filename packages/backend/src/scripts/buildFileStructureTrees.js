const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const pathToRoot = '../../'

const buildLinkContentArray = ({ name, rootRelativePath, trees }) => {
  return trees
    .filter(({ name: treeName }) => {
      return treeName !== name
    })
    .map(tree => {
      const relative = path.relative(rootRelativePath, tree.rootRelativePath)
      return `[${tree.name}](${relative}/tree.md)\n`
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

const buildTreeDocumentation = ({ levels, name, rootRelativePath, trees }) => {
  const relativePath = path.join(pathToRoot, rootRelativePath)
  return buildTreeContentArray({
    levels,
    relativePath,
  }).then(treeContentArray => {
    const treeLinks = buildLinkContentArray({ name, rootRelativePath, trees })

    const fileContent = [
      `# Tree for ${name}`,
      '## Links',
      ...treeLinks,
      '',
      '## Tree',
      ...treeContentArray,
    ].join('\n')

    const filePath = path.join(__dirname, relativePath, 'tree.md')
    fs.writeFileSync(filePath, fileContent, 'utf8')
  })
}

const trees = [
  {
    levels: 2,
    name: 'root',
    rootRelativePath: '',
  },
  {
    levels: 2,
    name: 'src',
    rootRelativePath: './src',
  },
  {
    levels: 3,
    name: 'apps',
    rootRelativePath: './src/apps',
  },
  {
    levels: 4,
    name: 'services',
    rootRelativePath: './src/services',
  },
  {
    levels: 4,
    name: 'lib',
    rootRelativePath: './src/lib',
  },
]

trees.forEach(tree => {
  buildTreeDocumentation({ trees, ...tree })
})
