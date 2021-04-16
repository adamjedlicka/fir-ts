import { join } from 'path'
import { readdir } from 'fs'
import { promisify } from 'util'

const areaddir = promisify(readdir)

interface PackageOpts {
  path: string
  meta: any
}

export default class Package {
  _path: string
  _meta: any

  constructor({ path, meta }: PackageOpts) {
    this._path = path
    this._meta = meta
  }

  join(...paths: string[]) {
    return join(this._path, ...paths)
  }

  async getFiles(...paths: string[]) {
    try {
      return await areaddir(this.join(...paths))
    } catch {
      return []
    }
  }
}
