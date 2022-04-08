import { createRouter, createWebHistory } from 'vue-router';
import Note from '../views/Note.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Note',
      component: Note,
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: () => import('../views/Edit.vue'),
    },
  ],
});

export default router;
