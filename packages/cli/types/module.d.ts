interface Require {
  (id: string): Record<string, any>
  cache: Record<string, any>
}

declare module 'module' {
  export function createRequire(filename: string): Require
}
