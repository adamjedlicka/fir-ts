import { join } from 'path'
import { readFile } from 'fs'
import { promisify } from 'util'
import { ViteDevServer } from 'vite'
import { renderToString } from '@vue/server-renderer'
import express from 'express'
import Fir from './Fir'

const areadFile = promisify(readFile)

const PORT = 3000

export default class Dev extends Fir {
  async run(viteDevServer: ViteDevServer) {
    await this.loadConfig()
    await this.loadPackages()
    await this.loadConcepts()

    await this.executeConcepts()

    const server = express()

    server.use(viteDevServer.middlewares)

    server.get('*', async (req, res, next) => {
      const url = req.originalUrl

      let template = await areadFile(join(process.cwd(), '.fir', 'index.html'), { encoding: 'utf-8' })
      template = await viteDevServer.transformIndexHtml(url, template)

      const entry = await viteDevServer.ssrLoadModule('/entry-server.js')

      const app = await entry.default()

      const appHtml = await renderToString(app)

      const html = template.replace(`<!--app-html-->`, appHtml)

      return res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    })

    server.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`))
  }
}
