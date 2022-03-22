import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import API from './services/API'

export const app = createApp(App)

app.config.globalProperties.socket = API.socket
app.config.globalProperties.isAuthenticated = false

app.use(router).mount('#app')

