import { join } from 'path'
import { copyFile } from 'fs'
import { promisify } from 'util'
import { Concept, Package } from '@fir/cli'

const acopyFile = promisify(copyFile)

export default class Templates extends Concept {
  directory() {
    return 'templates'
  }

  async execute(pkg: Package) {
    for (const file of await pkg.getFiles(this.directory())) {
      await acopyFile(pkg.join(this.directory(), file), join(process.cwd(), '.fir', file))
    }
  }
}
