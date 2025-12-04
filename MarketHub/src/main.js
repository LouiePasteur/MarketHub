import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseDialogue from './components/ui/BaseDialogue.vue'
import BaseFooter from './components/ui/BaseFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
import ProductItems from './components/products/ProductItems.vue'
import SPNavigation from './components/layout/SPNavigation.vue'
import ReviewCards from './components/ui/index/ReviewCards.vue'

const app = createApp(App)

app.use(router)
app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)
app.component('BaseDialogue', BaseDialogue)
app.component('BaseFooter', BaseFooter)
app.component('TheHeader', TheHeader)
app.component('ProductItems', ProductItems)
app.component('ReviewCards', ReviewCards)
// Register with kebab-case name to match <sp-navigation> usage
app.component('sp-navigation', SPNavigation)
app.mount('#app')
