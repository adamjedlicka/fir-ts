export { default as Package } from './src/Package'
export { default as Concept } from './src/Concept'

export interface FirConfig {
  packages: string[]
}

export const defineFirConfig = (firConfig?: FirConfig): FirConfig => {
  if (firConfig) return firConfig

  return {
    packages: [],
  }
}
