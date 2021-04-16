#!/usr/bin/env node

const path = require('path')
const vite = require('vite')

const main = async () => {
  const server = await vite.createServer({
    server: { middlewareMode: true },
    clearScreen: false,
    configFile: path.join(process.cwd(), 'vite.config.ts'),
    root: path.join(process.cwd(), '.fir'),
  })

  const { default: Dev } = await server.ssrLoadModule(path.join(__dirname, 'src', 'Dev.ts'))

  const fir = new Dev()
  await fir.run(server)
}

main()
