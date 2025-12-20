import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import ProductList from '../pages/products/ProductList.vue'
import Store from '../pages/stores/Store.vue'
import CreateStore from '../pages/stores/CreateStore.vue'
import CreateNews from '../pages/news/CreateNews.vue'
import CreateProducts from '../pages/products/CreateProducts.vue'
import CreateUser from '../pages/users/CreateUser.vue'
import StoreDetail from '@/components/store/StoreDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index, meta: { hideHeader: true } },
    { path: '/products', component: ProductList, meta: { hideHeader: false } },
    { path: '/store', component: Store, meta: { hideHeader: false } },
    { path: '/store/create', component: CreateStore, meta: { hideHeader: false } },
    { path: '/store/:id', component: StoreDetail, meta: { hideHeader: false } },
    { path: '/news/create', component: CreateNews, meta: { hideHeader: false } },
    { path: '/products/create', component: CreateProducts, meta: { hideHeader: false } },
    { path: '/users/create', component: CreateUser, meta: { hideHeader: false } },
  ],
})

export default router
