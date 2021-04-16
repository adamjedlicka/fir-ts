import { createSSRApp } from 'vue'
import App from './App.vue'

const main = () => {
  const app = createSSRApp(App)

  app.mount('#app')
}

main()
