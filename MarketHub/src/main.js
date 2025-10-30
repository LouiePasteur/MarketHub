import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseFooter from './components/ui/BaseFooter.vue'
const app = createApp(App)

app.use(router)
app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)
app.component('BaseFooter', BaseFooter)
app.mount('#app')
