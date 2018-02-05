import MockFs from '../mockFs'

import { generateMarkdownTranslations, parseFileName } from './generateMarkdown'

describe('scripts/markdown/generateMarkdown', () => {
  describe('generateMarkdownTranslations', () => {
    it('returns tree for one dir with one file', () => {
      const structure = {
        dir1: {
          'file1.en.md': 'Hello',
          type: 'DIR',
        },
      }
      const expectedResult = {
        dir1: {
          file1: {
            en: '<p>“Hello”</p>\n',
          },
        },
      }
      const mockFs = new MockFs(structure, 'translations/')
      const tree = generateMarkdownTranslations('translations/dir1', mockFs)
      expect(tree).toEqual(expectedResult)
    })
    it('returns tree for one dir and two files', () => {
      const structure = {
        dir1: {
          'file1.en.md': 'Hello',
          'file1.sv.md': 'Hej',
          type: 'DIR',
        },
      }
      const expectedResult = {
        dir1: {
          file1: {
            en: '<p>“Hello”</p>\n',
            sv: '<p>“Hej”</p>\n',
          },
        },
      }
      const mockFs = new MockFs(structure, 'translations/')
      const tree = generateMarkdownTranslations('translations/dir1', mockFs)
      expect(tree).toEqual(expectedResult)
    })
    it('returns tree for two dirs and three files', () => {
      const structure = {
        dir1: {
          'file1.en.md': 'Hello',
          'file1.sv.md': 'Hej',
          type: 'DIR',
        },
        dir2: {
          'file2.en.md': 'Hello',
          type: 'DIR',
        },
      }
      const expectedResult = {
        dir1: {
          file1: {
            en: '<p>“Hello”</p>\n',
            sv: '<p>“Hej”</p>\n',
          },
        },
        dir2: {
          file2: {
            en: '<p>“Hello”</p>\n',
          },
        },
      }
      const mockFs = new MockFs(structure, 'translations/')
      const tree = generateMarkdownTranslations('translations/dir1', mockFs)
      expect(tree).toEqual(expectedResult)
    })
    it('returns tree for two dirs with sub dirs', () => {
      const structure = {
        dir1: {
          dir3: {
            'file3.en.md': 'Hello',
            'file3.sv.md': 'Hej',
            type: 'DIR',
          },
          dir4: {
            'file4.en.md': 'Hello',
            type: 'DIR',
          },
          'file1.en.md': 'Hello',
          'file1.sv.md': 'Hej',
          type: 'DIR',
        },
        dir2: {
          'file2.en.md': 'Hello',
          type: 'DIR',
        },
      }
      const expectedResult = {
        dir1: {
          dir3: {
            file3: {
              en: '<p>“Hello”</p>\n',
              sv: '<p>“Hej”</p>\n',
            },
          },
          dir4: {
            file4: {
              en: '<p>“Hello”</p>\n',
            },
          },
          file1: {
            en: '<p>“Hello”</p>\n',
            sv: '<p>“Hej”</p>\n',
          },
        },
        dir2: {
          file2: {
            en: '<p>“Hello”</p>\n',
          },
        },
      }
      const mockFs = new MockFs(structure, 'translations/')
      const tree = generateMarkdownTranslations('translations/dir1', mockFs)
      expect(tree).toEqual(expectedResult)
    })
  })

  describe('parseFileName', () => {
    it('parses language and name from file name', () => {
      const results = parseFileName('test.en.md')
      expect(results).toEqual({ fileName: 'test', language: 'en' })
    })
    it('throws error when missing language in file name', () => {
      const fileName = 'test.md'
      expect(() => parseFileName(fileName)).toThrow(Error)
    })
  })
})
