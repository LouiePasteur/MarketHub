import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import ProductList from '../pages/products/ProductList.vue'
import Store from '../pages/stores/Store.vue'
import CreateStore from '../pages/stores/CreateStore.vue'
import CreateNews from '../pages/news/CreateNews.vue'
import CreateProducts from '../pages/products/CreateProducts.vue'
import EditUser from '../pages/users/EditUser.vue'
import StoreDetail from '@/components/store/StoreDetail.vue'
import Auth from '../pages/Auth.vue'


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
    { path: '/user/:id/edit', component: EditUser, meta: { hideHeader: false } },
    { path: '/login', component: Auth, meta: { hideHeader: true } },
    { path: '/signup', component: Auth, meta: { hideHeader: true } },
  ],
})

export default router
