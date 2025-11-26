import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import ProductList from '../pages/products/ProductList.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index, meta: { hideHeader: true } },
    { path: '/products', component: ProductList, meta: { hideHeader: false } },
  ],
})

export default router
