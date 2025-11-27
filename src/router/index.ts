import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      redirect: { name: 'pregunta' },
      children: [
        {
          path: 'pregunta',
          name: 'pregunta',
          component: () => import('../views/PreguntaRandomView.vue'),
        },
        {
          path: 'reto',
          name: 'reto',
          component: () => import('../views/RetoView.vue'),
        },
        {
          path: 'grupos',
          name: 'grupos',
          component: () => import('../views/GruposView.vue'),
        },
      ],
    },
  ],
})

export default router
