import { createSSRApp } from 'vue'
import App from './App.vue'

export default () => {
  const app = createSSRApp(App)

  return app
}
