import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('../pages/Home.vue')
    },
    {
      name: 'ShortLink',
      path: '/:code',
      component: () => import('../pages/ShortLink.vue')
    },
    {
      name: 'PageNotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/PageNotFound.vue')
    }
  ],
});

export default router;