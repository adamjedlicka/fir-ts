import { join, dirname } from 'path'
import { readdir } from 'fs'
import { promisify } from 'util'
import { createRequire } from 'module'
import { defineFirConfig, FirConfig } from '../index'
import Package from './Package'
import Concept from './Concept'

// Create 'require' function which will be able to resolve from root 'node_modules' directory
const require = createRequire(join(process.cwd(), '__index.js'))

const areaddir = promisify(readdir)

export default class Fir {
  _config: FirConfig = defineFirConfig()
  _packages: Package[] = []
  _concepts: Record<string, Concept> = {}

  async loadConfig() {
    const { default: config } = await import(join(this.getRootDir(), 'fir.config.ts'))

    this._config = config
  }

  async loadPackages() {
    this._packages = []

    for (const pkg of this._config.packages) {
      const resolved = require.resolve(pkg)
      const path = dirname(resolved)
      const meta = await import(resolved)

      this._packages.push(
        new Package({
          path,
          meta,
        })
      )
    }
  }

  async loadConcepts() {
    for (const pkg of this._packages) {
      try {
        const concepts = await areaddir(pkg.join('concepts'))

        for (const ident of concepts.map((concept) => concept.replace(/\..+$/, ''))) {
          const { default: Concept } = await import(pkg.join('concepts', ident))

          this._concepts[ident] = new Concept()
        }
      } catch {
        // Do nothing
      }
    }
  }

  async executeConcepts() {
    for (const concept of Object.values(this._concepts)) {
      await concept.beforeAll()

      for (const pkg of this._packages) {
        await concept.execute(pkg)
      }

      await concept.afterAll()
    }
  }

  getRootDir() {
    return process.cwd()
  }
}
