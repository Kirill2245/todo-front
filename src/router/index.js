import { createRouter, createWebHistory } from 'vue-router'

import TodoView from '../views/Todo.vue'
import RateView from '../views/Rate.vue'
import AboutView from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoView,
    },
    {
      path: '/rate',
      name: 'rate',
      component: RateView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
