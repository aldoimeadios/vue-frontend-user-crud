import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "edit" */ '../views/Create.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {loginAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {loginAuth: true}
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.userAuth) {
      next()
    } else {
      next('/login')
    }
  } else if(to.meta.loginAuth) {
    if (store.getters.userAuth) {
      next({ name: "Home" });
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
