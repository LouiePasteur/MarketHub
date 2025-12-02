import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import ProductList from '../pages/products/ProductList.vue'
import StoreList from '@/pages/stores/StoreList.vue'
import StoreDetail from '@/components/store/StoreDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index, meta: { hideHeader: true } },
    { path: '/products', component: ProductList, meta: { hideHeader: false } },
    { path: '/store', component: StoreList, meta: { hideHeader: false } },
    { path: '/store/:id', component: StoreDetail, meta: { hideHeader: false } },
  ],
})

export default router
