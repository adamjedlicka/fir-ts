import Package from './Package'

export default class Concept {
  directory(): string {
    throw 'unimplemented'
  }

  async beforeAll() {}

  async execute(pkg: Package) {}

  async afterAll() {}
}
