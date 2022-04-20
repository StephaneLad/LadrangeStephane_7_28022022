import { createRouter, createWebHashHistory } from 'vue-router'
import log from '../views/log.vue'
import creat from '../views/postcreator.vue'
import user from '../views/user.vue'
import updt from '../views/updatepost.vue'

const routes = [
  {
    path: '/log',
    name: 'log',
    component: log
  },
  {
    path: '/creat',
    name: 'creat',
    component: creat
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '/updt',
    name: 'updt',
    component: updt
  },
  {
    path: '/',
    name: 'login',
    component: log
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
